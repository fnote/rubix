import { Channels } from '../../../app-constants/enums/channels.enum';
import { Injectable } from '@angular/core';
import { PriceStreamingRequestHandler } from '../../price/protocols/streaming/price-streaming-request-handler';
import { TradeStreamingRequestHandler } from '../../trade/protocols/streaming/trade-straming-request-handler';
import { WebsocketService } from './websocket.service';

@Injectable()
export class PulseService {
	private TIME_INTERVAL = 10000; // 1000 * 10
	private MAX_HEARTBEATS = 5;
	private pulseInterval: NodeJS.Timer;
	private heartbeats = 0;

	constructor(private ws: any, private wsService: WebsocketService, private channel: number) {
		this.sendPulse();
	}

	public sendPulse(): void {
		this.pulseInterval = setInterval(() => {
			this.heartbeats++;
			const pulseObj = this.genaratePulseMessage(this.channel);

//close the socket if heartbeats> max heart beats 
			if (this.heartbeats >= this.MAX_HEARTBEATS) {
				this.wsService.closeWebSocket(this.ws);
				clearInterval(this.pulseInterval);
				return;
			}

			this.wsService.sendToWebSocket(this.ws, JSON.stringify(pulseObj));
		}, this.TIME_INTERVAL);
	}

	public resetPulse(): void {
		clearInterval(this.pulseInterval);
		this.heartbeats = 0;
		this.sendPulse();
	}

	private genaratePulseMessage(channel: number): Object {
		let pulseRequest: Object;
		//change pulse request according to channel
		switch (channel) {
			case Channels.Trade:
				pulseRequest = TradeStreamingRequestHandler.getInstance().genaratePulseRequest();
				break;
			case Channels.Price:
			case Channels.PriceMeta:
				pulseRequest = PriceStreamingRequestHandler.getInstance().genaratePulseRequest();
				break;
			default :
				pulseRequest = {};
		}
		return pulseRequest;
	}
}
