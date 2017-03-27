import * as Rx from 'rxjs/Rx';
import { Http, Request, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AjaxService {

	constructor(private http: Http) { }

	public send(requestParams: any): Promise<any> {
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

		return this.http.request(request).map(response => {
			return response.json();
		}).toPromise();
	}
}
