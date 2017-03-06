import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { CommunicationService } from '../communication/communication.service';

const MINUTE = 60000; // 1000 * 60

const META_CACHING_CONFIG = {
  req1 : {lifeTime: MINUTE , allowOldData: true},
  req2 : {lifeTime: MINUTE , allowOldData: false},
  req3 : {lifeTime: MINUTE , allowOldData: false},
  req4 : {lifeTime: MINUTE , allowOldData: false},
  req5 : {lifeTime: MINUTE , allowOldData: true},
  req6 : {lifeTime: MINUTE , allowOldData: true},
  req7 : {lifeTime: MINUTE , allowOldData: true},
  req8 : {lifeTime: MINUTE , allowOldData: true}

};

@Injectable()
export class CacheService {
  serverMetaVersionObj;
  constructor(private communicationManager: CommunicationService) {
  }

  updateServerMetaVersions(serverMetaVersionObj: Object): void {
    this.serverMetaVersionObj = serverMetaVersionObj;
  }

  getItem(request: string): any {

    return new Observable(observer => {
      let localStorageUptoDate = false;
      if (META_CACHING_CONFIG[request]) {
        const lsItem = localStorage.getItem(request);
        const localStorageItem = JSON.parse(lsItem);
        if (localStorageItem) {
          if (localStorageItem.expDate > new Date().getTime() && localStorageItem.version === this.serverMetaVersionObj[request]) {
            localStorageUptoDate = true;
            observer.next(localStorageItem);
            observer.complete();
          }else if (META_CACHING_CONFIG[request]['allowOldData']) {
            observer.next(localStorageItem);
          }
        }
      }

      if (!localStorageUptoDate) {
        this.communicationManager.getItem(request).forEach(res => {
          if (META_CACHING_CONFIG[request]) {
            this.saveToLocalStorage(request, res);
          }
          observer.next(res);
        }).then(() => { observer.complete(); });
      }
    });
  }

  saveToLocalStorage(key, object): void {
    object.expDate = this.getExpDate(key);
    object.version = this.serverMetaVersionObj[key];
    localStorage.setItem(key , JSON.stringify(object));
  }

  getExpDate(key: string): number {
    return  new Date().getTime() + META_CACHING_CONFIG[key]['lifeTime'];
  }
}
