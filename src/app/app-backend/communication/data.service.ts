import { AjaxService } from './ajax/ajax.service';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../app-utils/logger.service';
import { QueueMannagerService } from './websocket/queue-mannager.service';
import { Subject } from 'rxjs/Rx';

@Injectable()
// a service ;
export class DataService {

	private responseStream$: Subject<any> ;
	private responseAjaxStream$: Subject<any> ;

//constrcutir has services
	constructor(private queueMannagerService: QueueMannagerService, private ajaxService: AjaxService,
		private loggerService: LoggerService) {
		this.init();
	}

	/**
     * Send websocket message
     * @param {any} data - An object with following properties set
	 * 						index	: Value Defined at Connection configuration index. Mandatory
     *                      data    : Data to send. Mandatory.
     */
	//send to web socket any type of data but this message added to the queue
	public sendToWs(data: any): void {
		this.queueMannagerService.addMessageToQueue(data);
	}

	/**
     * Un-subscribe websocket connection
     * @param {number| Array<number>} channels - Value Defined at Connection configuration index
     */

	public unsubscribeWsConnections(channels: number|Array<number>): void {
		if (channels instanceof Array) {
			channels.forEach(channel => {
				this.queueMannagerService.unsubcribeConnection(channel);
			});
		} else {
			this.queueMannagerService.unsubcribeConnection(channels);
		}
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
		return this.ajaxService.send(requestOptions, false);
	}

	public getResponseSteam(): Subject<any> {
		return this.responseStream$;
	}

	public getAjaxResponseSteam(): Subject<any> {
		return this.responseAjaxStream$;
	}

	private init(): void {
		this.responseStream$ = new Subject();
		this.responseAjaxStream$ = new Subject();
		this.updateResponseStream();
		this.updateAjaxResponseStream();
	}

	private updateResponseStream(): void {
		this.queueMannagerService.getResponse().subscribe(msg => {
			if (msg && msg.data) {
				this.responseStream$.next(msg.data);
			}
		});
	}

	private updateAjaxResponseStream(): void {
		this.ajaxService.getResponse().subscribe(msg => {
			if (msg && msg.data) {
				this.responseAjaxStream$.next(msg.data);
			}
		});
	}
}
