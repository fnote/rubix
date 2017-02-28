import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs/Observable';
import { PulseService } from './pulse.service';

@Injectable()
export class QueueMannagerService {
	public connectedSocketPool = [];
	constructor() { }

	public getConnectedSocketByChanel(channel) {
		return this.connectedSocketPool.filter(socket => socket.channel === channel).pop();
	}

	private getConnectedSocket(connectionConfig) {
		const wsService = new WebsocketService();
		return  wsService.connect(connectionConfig).map((response: MessageEvent): Object => {
			const data = JSON.parse(response.data);
			wsService.pulseGenerator.resetPulse(wsService);
			return data;
		});
	}

	public connectPoolConnectionByChannel(connectionConfig): void {
		const wsService = new WebsocketService();
		this.connectedSocketPool.push({
			channel: connectionConfig.channel,
			socket : this.getConnectedSocket(connectionConfig)
		});
	}

	public sendMessage(sendMessage) {
		this.getConnectedSocketByChanel(sendMessage.channel).socket.next(sendMessage.message);
	}
}
