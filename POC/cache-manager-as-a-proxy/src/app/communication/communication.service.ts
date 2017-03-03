import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

const RESPONSE_DELAY = 2000; // 1000 * 2
@Injectable()
export class CommunicationService {

  constructor() { }

  getItem(request: String): any {
    let res;
    switch (request) {
      case 'req1':
        res = {a: 'res1'};
        break;
      case 'req2':
        res = {a: 'res2'};
        break;
      case 'req3':
        res = {a: 'res3'};
        break;
      case 'req4':
        res = {a: 'res4'};
        break;
      default:
        res = {a: 'resD'};
        break;
    }
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(res);
      }, RESPONSE_DELAY);
    });
  }
}
