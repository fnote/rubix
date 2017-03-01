import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {QueueMannagerService} from './websocket/queue-mannager.service';

@Injectable()
export class DataService {

	public subscribedConnections= [];

	constructor(private queueMannagerService: QueueMannagerService) {
	}

	public getSubscribeConnectionByChannel(channel) {
		return this.subscribedConnections.filter(connection => connection.channel === channel).pop();
	}

	public subscribeConnections(connectionConfigs) {
		connectionConfigs.forEach(config => {
			this.subscribeConnection(config);
		});
	}

	public subscribeConnection(connectionConfig) {
		const isConnected = this.queueMannagerService.getConnectedSocketByChanel(connectionConfig.channel);
		let isSubscribed = false;
		if (!isConnected) {
			this.queueMannagerService.connectPoolConnectionByChannel(connectionConfig);
		}
		isSubscribed = this.getSubscribeConnectionByChannel(connectionConfig.channel);
		if (!isSubscribed) {
			return this.subscribeConnectionByChannel(connectionConfig.channel);
		}
		return new Promise((resolve) => {
			resolve(isSubscribed);
		});
	}

	public unsubscribeConnection(connectionConfig) {
		this.getSubscribeConnectionByChannel(connectionConfig.channel).subscribe.unsubscribe();
	}

	public sendMessage(message, connectionConfig) {
		this.subscribeConnection(connectionConfig).then(() => {
			this.queueMannagerService.sendMessage(message);
		}).catch((error => {
			console.log(error + 'promise rejected');
		}));
	}

	private  subscribeConnectionByChannel(channel) {
		const connecedSocket = this.queueMannagerService.getConnectedSocketByChanel(channel);
		const subscribeOb = {
			channel: channel,
			subscribe: connecedSocket.socket.subscribe(msg => {
					console.log('Response: ' + msg);
				}, error => {
					console.log('Error: ' + error);
				}, () => {
					console.log('Disconnected');
				})
		};
		return new Promise((resolve, reject) => {
			resolve(this.subscribedConnections.push(subscribeOb));
		});
	}
}
