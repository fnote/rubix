import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable()
export class PulseService {
	private pulseInterval; 
	private missedPulses = 0;
	constructor() { }

	public sendPulse(wsService: WebsocketService) {
		const ws = wsService.ws;
		this.pulseInterval = setInterval(() => {
		this.missedPulses++;
		
		if (this.missedPulses >= 5) {
			ws.close();
			clearInterval(this.pulseInterval);
			console.log('Connection Disconnected.');
			return;
		}

		ws.send(this.missedPulses);
		console.log('Pulse sent: ' + this.missedPulses);
		}, 5000);
	}

	public resetPulse(wsService: WebsocketService) {
		// TODO: [Lahiru] Refactor once the log module is completed
		console.log('Pulse Resetting...');
		clearInterval(this.pulseInterval);
		this.missedPulses = 0;
		this.sendPulse(wsService);
	}
}
