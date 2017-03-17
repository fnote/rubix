import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { QueueMannagerService } from './websocket/queue-mannager.service';
import { AjaxService } from './ajax/ajax.service';

@Injectable()
export class DataService {
	private responseStream$ : Subject<any> ;
	constructor(private queueMannagerService : QueueMannagerService, private ajaxService : AjaxService) {
		this.init();
	}

	private init() : void {
		this.responseStream$ = new Subject();
		this.updateResponseStream();
	}

	/**
     * Send websocket message
     * @param data An object with following properties set
	 * 						index	: Value Defined at Connection configuration index. Mandatory
     *                      data    : Data to send. Mandatory.
     */

	public sendToWs(data : any) : void {
		this.queueMannagerService.addMessageToQueue(data);
	}

	/**
     * Un-subscribe websocket connection
     * @param  index-number: Value Defined at Connection configuration index
     */
	public unsubscribeWsConnection(index : number) : void {
		this.queueMannagerService.unsubcribeConnection(index);
	}

	/**
     * Send Ajax Request
     * @param requestOptions An object with following properties set
	 * 						url: string - Mandatory
     *						method: string | RequestMethod - Mandatory
     *						search: string | URLSearchParams;
     *						headers: Headers;
     *						body: any(Content - Mandatory(Except for Get Request);
     *						withCredentials: boolean;
     *						responseType: ResponseContentType;
     */

	public sendAjaxRequest(requestOptions : any ) : Promise<any> {
		return this.ajaxService.send(requestOptions);
	}

	public getResponseSteam() : Subject<any> {
		return this.responseStream$;
	}

	private updateResponseStream() : void {
		this.queueMannagerService.getResponse().subscribe(msg => {
			// TODO: [Chandana] Refactor once the log module is completed
			console.log('[DataService] response recived..' + msg );
			if( msg && msg.data ) {
				this.responseStream$.next(msg.data);
			}
		});
	}

}
