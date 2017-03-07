import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { PulseService } from './pulse.service';
import { ConfigService } from '../../config/config.service';

const TIME_INTERVAL = 3000; // 1000 * 3

interface Connection {
	channel : string;
	index : number;
	url : string;
	connectedSocket : Rx.Subject<MessageEvent>;
	sendMessageQueue : Array<any>;
	recivedMessageQueue : Array<any>;
	isConnected : boolean;
	sendQueueProcessInterval : any;
	recivedQueueProcessInterval : any;
	subscription : any;
	pulseService : PulseService;
}

@Injectable()
export class QueueMannagerService {
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
		const connectionConfig = this.configService.getConnectionConfig();
		connectionConfig.forEach(connection => {
			const connConfig = {
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

	private connect(connectionConfig) : void {
		const connection = this.getConnectionByIndex(connectionConfig.index);
		if (!connection.isConnected) {
			this.websocketService.initConnection(connection).then(sockt => {
				const socket = this.websocketService.createConnection(sockt);
				connection.connectedSocket = socket;
				connection.isConnected = true;
				this.subscribeForConnected(connectionConfig.index);
				this.activateSentReciveFromQueue(connection.sendMessageQueue, connection.sendQueueProcessInterval, connection.connectedSocket);
				this.activateSentReciveFromQueue(connection.recivedMessageQueue, connection.recivedQueueProcessInterval, this.response$);
			}).catch(error => {
				console.log('[QueueMannagerService] error occured..' + connectionConfig.channel );
			});
		}else {
			console.log('[QueueMannagerService] allready connected..' + connectionConfig.channel );
		}
	}

	private activateSentReciveFromQueue(messageQueue : Array<any>, timeIntervalProcess : any, socket : Rx.Subject<MessageEvent> ) : void {
		timeIntervalProcess = setInterval(() => {
			if ( messageQueue.length > 0 ) {
				const msg = this.deQueueMessage(messageQueue);
				socket.next(<MessageEvent>{data: msg});
			}
		}, TIME_INTERVAL);
	}

	private subscribeForConnected(index) {
		const connection = this.getConnectionByIndex(index);
		if (connection.connectedSocket && !connection.subscription ) {
			connection.subscription = connection.connectedSocket.subscribe(msg => {
													if (JSON.parse(msg.data).channel !== 'pulse') {
														this.enQueueMessage(msg, connection.recivedMessageQueue);
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
		const connection = this.getConnectionByIndex(index);
		if (connection.isConnected && connection.subscription) {
			connection.isConnected = false;
			connection.subscription.unsubscribe();
			connection.subscription = null;
			clearInterval(connection.sendQueueProcessInterval);
			clearInterval(connection.recivedQueueProcessInterval);
			connection.sendQueueProcessInterval = null;
		}
	}

	public addMessageToQueue(data) : void {
		const connection = this.getConnectionByIndex(data.index);
		this.enQueueMessage(data.data, connection.sendMessageQueue);
		if (!connection.isConnected) {
			this.connect(data);
		}
	}
}
