import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {QueueMannagerService} from './websocket/queue-mannager.service';

@Injectable()
export class DataService {

	private subscribedConnections = [];
	constructor(private queueMannagerService: QueueMannagerService) {
		this.init();
	}

	private init() {
		this.getResponseData();
	}

	public send(data) {
		this.queueMannagerService.addMessageToQueue(data);
	}

	public unsubscribeConnection(index: number): void {
		this.queueMannagerService.unsubcribeConnection(index);
	}

	private getResponseData() {
		this.queueMannagerService.getResponse().subscribe(msg => {
			// TODO: [Chandana] Refactor once the log module is completed
			console.log('[DataService] response recived..' + msg );
		});
	}

}
