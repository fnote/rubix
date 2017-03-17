import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { PulseService } from './pulse.service';
import { ConfigService } from '../../../config/config.service';
import { Connection } from '../connection';

@Injectable()
export class QueueMannagerService {
	private TIME_INTERVAL : number = 300; // 1000 * 3
	private connectedSocketPool : Array<Connection> = [];
	private response$ : Rx.Subject<any> ;

	constructor(private configService : ConfigService, private websocketService : WebsocketService) {
		this.response$ = new Rx.Subject();
		this.init();
	}

	public getResponse() : Rx.Subject<any> {
		return this.response$;
	}

	private init() : void {
		this.configService.getConnectionConfig().forEach(connection => {
			const connConfig : Connection = {
				channel: connection.channel,
				index: connection.index,
				url: connection.url,
				connectedSocket: null,
				sendMessageQueue: [],
				recivedMessageQueue: [],
				isConnected: false,
				sendQueueProcessInterval: null,
				recivedQueueProcessInterval: null,
				subscription: null,
				pulseService: null
			};
			this.connectedSocketPool.push(connConfig);
		});
	}

	private enQueueMessage(message : Object, messageQueue : Array<any>) : void {
		messageQueue.push(message);
	}

	private deQueueMessage(messageQueue : Array<any>) : any {
		return messageQueue.shift();
	}


	public getConnectionByIndex(index : number) : Connection {
		return this.connectedSocketPool[index];
	}

	private connect(connectionConfig : Connection) : void {
		const connection : Connection = this.getConnectionByIndex(connectionConfig.index);
		if (!connection.isConnected) {
			this.websocketService.initConnection(connection).then(sockt => {
				const socket : Rx.Subject<MessageEvent> = this.websocketService.createConnection(sockt);
				connection.connectedSocket = socket;
				connection.isConnected = true;
				this.subscribeForConnected(connectionConfig.index);
				this.activateSentReceive(connection.sendMessageQueue, connection.sendQueueProcessInterval, connection.connectedSocket, connection.index);
				this.activateSentReceive(connection.recivedMessageQueue, connection.recivedQueueProcessInterval, this.response$ , connection.index);
			}).catch(error => {
				console.log('[QueueMannagerService] error occured..' + connectionConfig.channel );
			});
		}else {
			console.log('[QueueMannagerService] allready connected..' + connectionConfig.channel );
		}
	}

	private activateSentReceive(messageQueue : Array<any>, timeIntervalProcess : NodeJS.Timer , socket : Rx.Subject<MessageEvent> , index : number ) : void {
		timeIntervalProcess = setInterval(() => {
			if ( messageQueue.length > 0 ) {
				const msg : any = this.deQueueMessage(messageQueue);
				const sendRecivedMsg = {
					data : {
						data : msg,
						connection : index
					}
				};
				socket.next(<MessageEvent>sendRecivedMsg);
			}
		}, this.TIME_INTERVAL);
	}

	private subscribeForConnected(index : number) : void {
		const connection : Connection = this.getConnectionByIndex(index);
		if (connection.connectedSocket && !connection.subscription ) {
			connection.subscription = connection.connectedSocket.subscribe(msg => {
													if (JSON.parse(msg.data).channel !== 'pulse' && msg.data) {
														this.enQueueMessage(msg.data, connection.recivedMessageQueue);
													}
													connection.pulseService.resetPulse();
												}, error => {
													console.log('[QueueMannagerService] error occured..' + error );
												}, () => {
													this.unsubcribeConnection(connection.index);
													console.log('[QueueMannagerService] disconnected.. ' + connection.channel );
												});
		}
	}

	public unsubcribeConnection(index : number) : void {
		const connection : Connection = this.getConnectionByIndex(index);
		if (connection.isConnected && connection.subscription) {
			connection.isConnected = false;
			connection.subscription.unsubscribe();
			connection.subscription = null;
			clearInterval(connection.sendQueueProcessInterval);
			clearInterval(connection.recivedQueueProcessInterval);
			connection.sendQueueProcessInterval = null;
		}
	}

	public addMessageToQueue(data : any) : void {
		const connection : Connection = this.getConnectionByIndex(data.index);
		this.enQueueMessage(data.data, connection.sendMessageQueue);
		if (!connection.isConnected) {
			this.connect(data);
		}
	}
}
