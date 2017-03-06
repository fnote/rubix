import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { PulseService } from './pulse.service';
import { ConfigService } from '../config/config.service';

const TIME_INTERVAL = 3000; // 1000 * 3

interface Connection {
	channel: string;
	index: number;
	url: string;
	connectedSocket: Rx.Subject<MessageEvent>;
	sendMessageQueue: Array<any>;
	isConnected: boolean;
	queueProcessInterval: any;
	subscription: any;
}

@Injectable()
export class QueueMannagerService {
	private connectedSocketPool: Array<Connection> = [];
	private response$: Rx.Subject<any> ;

	constructor(private configService: ConfigService, private websocketService: WebsocketService) {
		this.response$ = new Rx.Subject();
		this.init();
	}

	public getResponse(): Rx.Subject<any> {
		return this.response$;
	}

	private init(): void {
		const connectionConfig = this.configService.getConnectionConfig();
		connectionConfig.forEach(connection => {
			const connConfig = {
				channel: connection.channel,
				index: connection.index,
				url: connection.url,
				connectedSocket: null,
				sendMessageQueue: [],
				isConnected: false,
				queueProcessInterval: null,
				subscription: null
			};
			this.connectedSocketPool.push(connConfig);
		});
	}

	private enQueuesendMessage(message: Object, sendMessageQueue: Array<any>): void {
		sendMessageQueue.push(message);
	}

	private deQueueSendMessage(sendMessageQueue: Array<any>): any {
		return sendMessageQueue.shift();
	}

	public getConnectionByIndex(index: number): Connection {
		return this.connectedSocketPool[index];
	}

	private connect(connectionConfig): void {
		const connection = this.getConnectionByIndex(connectionConfig.index);
		if (!connection.isConnected) {
			this.websocketService.initConnection(connection).then(sockt => {
				const socket = this.websocketService.createConnection(sockt);
				connection.connectedSocket = socket;
				connection.isConnected = true;
				this.subscribeForConnected(connectionConfig.index);
				this.activateSendFromQueue(connection);
			}).catch(error => {
				console.log('[QueueMannagerService] error occured..' + connectionConfig.channel );
			});
		} else {
			console.log('[QueueMannagerService] allready connected..' + connectionConfig.channel );
		}
	}
	 
	private activateSendFromQueue(connectionConfig: Connection): void {
		const connection = this.getConnectionByIndex(connectionConfig.index);
		const sendMessageQueue = connection.sendMessageQueue;
		const socket = connection.connectedSocket;
		connection.queueProcessInterval = setInterval(() => {
			if ( sendMessageQueue.length > 0 ) {
				const msg = this.deQueueSendMessage(sendMessageQueue);
				connection.connectedSocket.next(<MessageEvent>{data: msg});
			}
		}, TIME_INTERVAL);
	}

	private subscribeForConnected(index) {
		const connection = this.getConnectionByIndex(index);
		if (connection.connectedSocket && !connection.subscription) {
			connection.subscription = connection.connectedSocket.subscribe(msg => {
													console.log('[QueueMannagerService] response recived from ' + connection.channel );
													this.response$.next(msg);
												}, error => {
													console.log('[QueueMannagerService] error occured..' + error );
												}, () => {
													console.log('[QueueMannagerService] disconnected..' + connection.channel );
												});
		}
	}

	public unsubcribeConnection(index: number): void {
		const connection = this.getConnectionByIndex(index);
		if (connection.isConnected && connection.subscription) {
			connection.isConnected = false;
			// connection.subscription.unsubscribe();
			connection.subscription = null;
			clearInterval(connection.queueProcessInterval);
			connection.queueProcessInterval = null;
		}
	}

	public addMessageToQueue(data): void {
		const connection = this.getConnectionByIndex(data.index);
		this.enQueuesendMessage(data.data, connection.sendMessageQueue);
		if (!connection.isConnected) {
			this.connect(data);
		}
	}
}
