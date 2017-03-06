import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { PulseService } from './pulse.service';

@Injectable()
export class WebsocketService {
	private socket: Rx.Subject<MessageEvent>;
	constructor() { }

	public initConnection(connection): Promise<WebSocket> {
		const ws = new WebSocket(connection.url);
		const promise  = new Promise((resolve, reject) => {
			ws.onopen = (res) => {
				// new PulseService(ws, this);
				console.log('[WebsocketService] connected to ' + connection.url );
				resolve(ws);
			};
		});
		return promise;	
	}

	public createConnection(socket: WebSocket): Rx.Subject<MessageEvent> {

		const observable = Rx.Observable.create(
			(obs: Rx.Observer<MessageEvent>) => {
				socket.onmessage = obs.next.bind(obs);
				socket.onerror = obs.error.bind(obs);
				socket.onclose = obs.complete.bind(obs);
				return socket.close.bind(socket);
		});

		const observer = {
			next: (data: Object) => {
				if (socket.readyState === WebSocket.OPEN) {
					socket.send(JSON.stringify(data));
				}
			}
		};
		return Rx.Subject.create(observer, observable);
	}

	public closeWebSocket(ws: WebSocket) {
		ws.close();
	}

	public sendToWebSocket(ws: WebSocket, message) {
		ws.send(message);
	}

}
