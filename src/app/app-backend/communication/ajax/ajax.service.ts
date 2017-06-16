import * as Rx from 'rxjs/Rx';
import { Http, Request, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../../app-utils/logger.service';

@Injectable()
export class AjaxService {

	private response$: Rx.Subject<any> ;

	constructor(private http: Http, private loggerService: LoggerService) {
		this.response$ = new Rx.Subject();
	}

	public getResponse(): Rx.Subject<any> {
		return this.response$;
	}

	public send(requestParams: any, routeToResponseHandler: boolean): Promise<any> {
		const requestOptions: RequestOptions = new RequestOptions({
			method: requestParams.method,
			url: requestParams.url,
			body: requestParams.body ? requestParams.body : null ,
			search: requestParams.search ? requestParams.search : null,
			headers: requestParams.headers ? requestParams.headers : null,
			withCredentials: requestParams.withCredentials ? requestParams.withCredentials : false,
			responseType: requestParams.responseType ? requestParams.responseType : null,
		});
		const request: Request = new Request(requestOptions);
		return new Promise((resolve, reject) => {
			this.http.request(request)
				.toPromise()
				.then(
					res => {
						if (routeToResponseHandler) {
							const recivedMsg = {
								data: {
									data: res['_body'],
									connection: 'channel',
								},
							};
							this.response$.next(<MessageEvent>recivedMsg);
						}else {
							resolve(res);
						}
					},
					err => {
						if (routeToResponseHandler) {
							this.loggerService.logError(err + ' AjaxService');
						} else {
							reject(err);
						}
					},
				);
		});
	}
}
