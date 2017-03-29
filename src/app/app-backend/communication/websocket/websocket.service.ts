import * as Rx from 'rxjs/Rx';
import { Connection } from '../connection';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../../utils/logger.service';
import { PulseService } from './pulse.service';

@Injectable()
export class WebsocketService {

	constructor(private loggerService: LoggerService) {
		// Some Code
	}

	public initConnection(connection: Connection): Promise<WebSocket> {
		const ws: WebSocket = new WebSocket(connection.url);
		const promise: Promise<WebSocket> = new Promise((resolve, reject) : void => {
			ws.onopen = () : void => {
				connection.pulseService = new PulseService(ws, this);
				this.loggerService.logInfo('connected to ' + connection.url , 'WebsocketService');
				resolve(ws);
			};
		});
		return promise;
	}

	public createConnection(socket: WebSocket): Rx.Subject<MessageEvent> {

		const observable: any = Rx.Observable.create(
			(obs: Rx.Observer<MessageEvent>) => {
				socket.onmessage = obs.next.bind(obs);
				socket.onerror = obs.error.bind(obs);
				socket.onclose = obs.complete.bind(obs);
				return socket.close.bind(socket);
			});

		const observer: any = {
			next: (data: any) : void => {
				if (socket.readyState === WebSocket.OPEN) {
					socket.send(data.data.data);
					this.loggerService.logInfo('sent to ' + socket.url , 'WebsocketService');
				}
			},
		};
		return Rx.Subject.create(observer, observable);
	}

	public closeWebSocket(ws: WebSocket): void {
		ws.close();
	}

	public sendToWebSocket(ws: WebSocket, message: any): void {
		ws.send(message);
	}

}
