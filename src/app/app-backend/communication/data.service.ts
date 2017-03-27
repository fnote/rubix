import { AjaxService } from './ajax/ajax.service';
import { Injectable } from '@angular/core';
import { QueueMannagerService } from './websocket/queue-mannager.service';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DataService {
	private responseStream$: Subject<any> ;
	constructor(private queueMannagerService: QueueMannagerService, private ajaxService: AjaxService) {
		this.init();
	}

	private init(): void {
		this.responseStream$ = new Subject();
		this.updateResponseStream();
	}

	/**
     * Send websocket message
     * @param {any} data - An object with following properties set
	 * 						index	: Value Defined at Connection configuration index. Mandatory
     *                      data    : Data to send. Mandatory.
     */
	public sendToWs(data: any): void {
		this.queueMannagerService.addMessageToQueue(data);
	}

	/**
     * Un-subscribe websocket connection
     * @param {number} index - Value Defined at Connection configuration index
     */
	public unsubscribeWsConnection(index: number): void {
		this.queueMannagerService.unsubcribeConnection(index);
	}

	/**
     * Send Ajax Request
     * @param {any} requestOptions - An object with following properties set
	 * 						url: string - Mandatory
     *						method: string | RequestMethod - Mandatory
     *						search: string | URLSearchParams;
     *						headers: Headers;
     *						body: any(Content - Mandatory(Except for Get Request);
     *						withCredentials: boolean;
     *						responseType: ResponseContentType;
     * @returns {Promise<any>} Response
     */
	public sendAjaxRequest(requestOptions: any): Promise<any> {
		return this.ajaxService.send(requestOptions);
	}

	public getResponseSteam(): Subject<any> {
		return this.responseStream$;
	}

	private updateResponseStream(): void {
		this.queueMannagerService.getResponse().subscribe(msg => {
			// TODO: [Chandana] Refactor once the log module is completed
			console.log('[DataService] response recived..' + msg);
			if (msg && msg.data) {
				this.responseStream$.next(msg.data);
			}
		});
	}

}
