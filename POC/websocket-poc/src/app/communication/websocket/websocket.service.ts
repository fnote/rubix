import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { PulseService } from './pulse.service';
import { Connection } from '../connection';

@Injectable()
export class WebsocketService {

	constructor() { }

	public initConnection(connection : Connection) : Promise<WebSocket> {
		const ws : WebSocket = new WebSocket(connection.url);
		const promise : Promise<WebSocket> = new Promise((resolve, reject) => {
			ws.onopen = () => {
				connection.pulseService = new PulseService(ws, this);
				console.log('[WebsocketService] connected to ' + connection.url );
				resolve(ws);
			};
		});
		return promise;
	}

	public createConnection(socket : WebSocket) : Rx.Subject<MessageEvent> {

		const observable : Rx.Observable = Rx.Observable.create(
			(obs : Rx.Observer<MessageEvent>) => {
				socket.onmessage = obs.next.bind(obs);
				socket.onerror = obs.error.bind(obs);
				socket.onclose = obs.complete.bind(obs);
				return socket.close.bind(socket);
		});

		const observer : any = {
			next: ( data : Object ) => {
				if (socket.readyState === WebSocket.OPEN) {
					socket.send(JSON.stringify(data));
					console.log('[WebsocketService] sent to ' + socket.url + ' ' + data );
				}
			}
		};
		return Rx.Subject.create(observer, observable);
	}

	public closeWebSocket(ws : WebSocket) : void {
		ws.close();
	}

	public sendToWebSocket(ws : WebSocket, message : any) : void {
		ws.send(message);
	}

}
