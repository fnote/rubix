import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

interface PulseConfig {
	index : number;
	channel : string;
}

@Injectable()
export class PulseService {
	private TIME_INTERVAL : number = 5000; // 1000 * 5
	private MAX_HEARTBEATS : number = 5;
	private pulseObj : PulseConfig;
	private pulseInterval : NodeJS.Timer;
	private heartbeats : number = 0;

	constructor(private ws : WebSocket, private wsService : WebsocketService) {
		this.sendPulse();
	}

	public sendPulse() : void {
		this.pulseInterval = setInterval(() => {
			this.heartbeats++;
			this.pulseObj = {
				index: this.heartbeats,
				channel: 'pulse'
			};

			if (this.heartbeats >= this.MAX_HEARTBEATS) {
				this.wsService.closeWebSocket(this.ws);
				clearInterval(this.pulseInterval);
				// TODO: [Lahiru] Refactor once the log module is completed
				console.log('Disconnected. ' + this.ws.url);
				return;
			}

			this.wsService.sendToWebSocket(this.ws, JSON.stringify(this.pulseObj));
			// TODO: [Lahiru] Refactor once the log module is completed
			console.log('[PulseGenerator] Pulse sent to ' + this.ws.url + ': ' + this.pulseObj.index);
		}, this.TIME_INTERVAL);
	}

	public resetPulse() : void {
		// TODO: [Lahiru] Refactor once the log module is completed
		console.log('[PulseGenerator] Pulse Resetting..');
		clearInterval(this.pulseInterval);
		this.heartbeats = 0;
		this.sendPulse();
	}
}
