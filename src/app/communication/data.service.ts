import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {QueueMannagerService} from './websocket/queue-mannager.service';
import { AjaxService } from './ajax/ajax.service';

@Injectable()
export class DataService {

	constructor(private queueMannagerService : QueueMannagerService, private ajaxService : AjaxService) {
		this.init();
	}

	private init() {
		this.getWsResponse();
	}

	public sendToWs(data) : void {
		this.queueMannagerService.addMessageToQueue(data);
	}

	public unsubscribeWsConnection(index : number) : void {
		this.queueMannagerService.unsubcribeConnection(index);
	}

	private getWsResponse() : void {
		this.queueMannagerService.getResponse().subscribe(msg => {
			// TODO: [Chandana] Refactor once the log module is completed
			console.log('[DataService] response recived..' + msg );
		});
	}

	public sendAjaxRequest(requestOptions) : Promise<any> {
		return this.ajaxService.send(requestOptions);
	}

}
