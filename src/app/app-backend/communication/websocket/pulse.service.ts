import { Injectable } from '@angular/core';
import { PriceRequestTypes } from '../../../constants/enums/price-request-types.enum'
import { WebsocketService } from './websocket.service';

interface PulseConfig {
	MT: PriceRequestTypes;
}

@Injectable()
export class PulseService {
	private TIME_INTERVAL = 5000; // 1000 * 5
	private MAX_HEARTBEATS = 5;
	private pulseObj: PulseConfig;
	private pulseInterval: NodeJS.Timer;
	private heartbeats = 0;

	constructor(private ws: WebSocket, private wsService: WebsocketService) {
		this.sendPulse();
	}

	public sendPulse(): void {
		this.pulseInterval = setInterval(() => {
			this.heartbeats++;
			this.pulseObj = {
				MT: PriceRequestTypes.Pulse,
			};

			if (this.heartbeats >= this.MAX_HEARTBEATS) {
				this.wsService.closeWebSocket(this.ws);
				clearInterval(this.pulseInterval);
				return;
			}

			this.wsService.sendToWebSocket(this.ws, '[' + JSON.stringify(this.pulseObj) + ']');
		}, this.TIME_INTERVAL);
	}

	public resetPulse(): void {
		clearInterval(this.pulseInterval);
		this.heartbeats = 0;
		this.sendPulse();
	}
}
