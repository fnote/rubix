import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class AjaxService {

	constructor(private http: Http) { }

}
