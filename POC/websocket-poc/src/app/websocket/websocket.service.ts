import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { PulseService } from './pulse.service';

@Injectable()
export class WebsocketService {
	public ws;
	public pulseGenerator;
	private socket: Rx.Subject<MessageEvent>;
	constructor() { }

	public connect(conOb): Rx.Subject<MessageEvent> {
		this.socket = this.create(conOb.url);
		console.log('Connecting...');
		return this.socket;
	}

	private create(url): Rx.Subject<MessageEvent> {
		this.ws = new WebSocket(url);

		const observable = Rx.Observable.create(
			(obs: Rx.Observer<MessageEvent>) => {
				this.ws.onopen = (evt) => {
					this.pulseGenerator = new PulseService();
					this.pulseGenerator.sendPulse(this);
					console.log('Connected: ' + url);
				};
				this.ws.onmessage = obs.next.bind(obs);
				this.ws.onerror = obs.error.bind(obs);
				this.ws.onclose = obs.complete.bind(obs);
				
				return this.ws.close.bind(this.ws);
		});

		const observer = {
			next: (data: Object) => {
				if (this.ws.readyState === WebSocket.OPEN) {
					this.ws.send(JSON.stringify(data));
				}
			}
		};

		return Rx.Subject.create(observer, observable);
	}
}
