import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { RequestOptions, Request, Http } from '@angular/http';

@Injectable()
export class AjaxService {

	constructor(private http : Http) { }

	public send(requestOptions : RequestOptions) : Promise<any> {
		const options : RequestOptions = new RequestOptions({
			method: requestOptions.method,
			url: requestOptions.url,
			body: requestOptions.body ? requestOptions.body : null ,
			search: requestOptions.search ? requestOptions.search : null,
			headers: requestOptions.headers ? requestOptions.headers : null,
			withCredentials: requestOptions.withCredentials ? requestOptions.withCredentials : false,
			responseType: requestOptions.responseType ? requestOptions.responseType : null
		});
		const request : Request = new Request(options);
		return this.http.request(request).map(response => {
			return response.json();
		}).toPromise();
	}
}

