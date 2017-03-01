import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

const TIME_INTERVAL = 5000; // 1000 * 5
const MAX_HEARTBEATS = 5;

@Injectable()
export class PulseService {
	private pulseInterval; 
	private heartbeats = 0;
	constructor() { }

	public sendPulse(wsService: WebsocketService) {
		const ws = wsService.getWebSocket();
		this.pulseInterval = setInterval(() => {
		this.heartbeats++;
		
		if (this.heartbeats >= MAX_HEARTBEATS) {
			wsService.closeWebSocket(ws);
			clearInterval(this.pulseInterval);
			console.log('Connection Disconnected.');
			return;
		}

		wsService.sendToWebSocket(ws, this.heartbeats);
		console.log('[PulseGenerator] Pulse sent: ' + this.heartbeats);
		}, TIME_INTERVAL);
	}

	public resetPulse(wsService: WebsocketService) {
		// TODO: [Lahiru] Refactor once the log module is completed
		console.log('[PulseGenerator] Pulse Resetting..');
		clearInterval(this.pulseInterval);
		this.heartbeats = 0;
		this.sendPulse(wsService);
	}
}
