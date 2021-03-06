import * as Rx from 'rxjs/Rx';
import { ConfigService } from '../../../app-config/config.service';
import { Connection } from '../connection';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../../app-utils/logger.service';
import { Observable } from 'rxjs/Observable';
import { PulseService } from './pulse.service';
import { WebsocketService } from './websocket.service';

@Injectable()
export class QueueMannagerService {
	private TIME_INTERVAL = 300;
	private connectedSocketPool: Array<Connection> = [];
	private response$: Rx.Subject<any> ;  //response can be any time 
	private isConfigLoaded = false;   
	private updateConfigurations$: Rx.Subject<boolean> ;//reactive extension of js takes type boolean yes or no
	//subject is an active observable can be forced to emit the next value 

	constructor(private configService: ConfigService, private websocketService: WebsocketService,
		private loggerService: LoggerService) {
		this.response$ = new Rx.Subject();
		this.updateConfigurations$ = new Rx.Subject();
		this.init();
	}

	public getResponse(): Rx.Subject<any> {
		return this.response$;
	}

//a promise 
	public getConnectionByChannel(channel: number): Promise<Connection> {
		return new Promise((resolve, reject) => {
			if (this.isConfigLoaded) {
				resolve(this.connectedSocketPool[channel]);
			}else {
				this.updateConfigurations$.subscribe(configLoaded => {
					resolve(this.connectedSocketPool[channel]);
				});
			}
		});
	}

	public unsubcribeConnection(channel: number): void {
		this.getConnectionByChannel(channel).then(connection => {
			if (connection.isConnected && connection.subscription) {
				connection.isConnected = false;
				connection.isConnecting = false;
				connection.subscription.unsubscribe();
				connection.subscription = null;
				connection.sendMessageQueue = [];
				clearInterval(connection.sendQueueProcessInterval);
				connection.sendQueueProcessInterval = null;
			}
		});
	}

	public addMessageToQueue(data: any): void {
		this.getConnectionByChannel(data.channel).then(connection => {
			this.enQueueMessage(data.data, connection.sendMessageQueue);
			if (!connection.isConnected && !connection.isConnecting) {
				this.connect(data);
				connection.isConnecting = true;
			}
		});
	}

	private init(): void {
		this.configService.getConnectionConfig().then(connections => {
			connections.forEach(connection => {
				const connConfig: Connection = {
					channel: connection.channel,
					url: connection.url,
					connectedSocket: null,
					sendMessageQueue: [],
					isConnected: false,
					isConnecting: false,
					sendQueueProcessInterval: null,
					subscription: null,
					pulseService: null,
				};
				this.connectedSocketPool.push(connConfig);
			});
			this.updateConfigurations$.next(true);
			this.isConfigLoaded = true;
		});
	}

// add msgs to the queue push 
	private enQueueMessage(message: Object, messageQueue: Array<any>): void {
		messageQueue.push(message);
	}

//remove msgs from queue 
	private deQueueMessage(messageQueue: Array<any>): any {
		return messageQueue.shift();
	}

	private connect(connectionConfig: Connection): void {
		this.getConnectionByChannel(connectionConfig.channel).then(connection => {
			if (!connection.isConnected) {
				this.websocketService.initConnection(connection).then(sockt => {
					const socket: Rx.Subject<MessageEvent> = this.websocketService.createConnection(sockt);
					connection.connectedSocket = socket;
					connection.isConnected = true;
					connection.isConnecting = false;
					this.subscribeForConnected(connectionConfig.channel);
					this.activateSentFromQueue(
						connection.sendMessageQueue,
						connection.sendQueueProcessInterval,
						connection.connectedSocket,
						connection.channel);
				}).catch(error => {
					this.loggerService.logInfo('error occured ' + connectionConfig.channel , 'QueueMannagerService');
				});
			}else {
				this.loggerService.logInfo('allready connected ' + connectionConfig.channel , 'QueueMannagerService');
			}
		});
	}

	private activateSentFromQueue(messageQueue: Array<any>, timeIntervalProcess: NodeJS.Timer,
		socket: Rx.Subject<MessageEvent> , channel: number): void {
		timeIntervalProcess = setInterval(() => {
			if (messageQueue.length > 0) {
				const msg: any = this.deQueueMessage(messageQueue);
				const sendMsg = {
					data : {
						data : msg,
						connection : channel,
					},
				};
				socket.next(<MessageEvent>sendMsg);
			}
		}, this.TIME_INTERVAL);
	}

	private subscribeForConnected(channel: number): void {
		this.getConnectionByChannel(channel).then(connection => {
			if (connection.connectedSocket && !connection.subscription) {
				connection.subscription = connection.connectedSocket.subscribe(msg => {
					const recivedMsg = {
						data : {
							data : msg.data,
							connection : channel,
						},
					};
					this.response$.next(<MessageEvent>recivedMsg);
					connection.pulseService.resetPulse();
				}, error => {
					this.loggerService.logError(error, 'QueueMannagerService');
				}, () => {
					this.unsubcribeConnection(connection.channel);
					this.loggerService.logInfo('disconnected ' + connection.channel , 'QueueMannagerService');
				});
			}
		});
	}
}
