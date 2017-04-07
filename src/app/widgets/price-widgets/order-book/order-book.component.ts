import { Component, OnDestroy, OnInit } from '@angular/core';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
})
export class OrderBookComponent implements OnInit, OnDestroy {

  public stockObj;
  private exgStock:[string, string] = ['DFM', 'EMAAR'];

  constructor(private priceService:PriceService) {
    // Constructor
    this.stockObj = this.priceService.stockDM.getOrAddStock(this.exgStock);

    // TODO: [Chaamini] Below is hardcoded until the login is impmented
    const authParams:Object = {
      priceVerion: '1',
      userName: 'chaamini',
      password: 'password',
      userType: '30',
      subType: '1',
      omsId: 10,
      brokerCode: 'MFS_UAT',
    };
    this.priceService.authenticateWithUsernameAndPassword(authParams, 2);
  }

  public ngOnInit():void {
    // on init
    setTimeout(() => {
      if (!this.stockObj) {
        this.stockObj = this.priceService.stockDM.getOrAddStock(this.exgStock);
      }

      if (!this.stockObj.isMetaDataLoaded) {
        this.priceService.requestSymbolMeta(this.exgStock);
      }

      // Add the symbol subscription
      this.priceService.addSymbolRequest(this.exgStock);
    }, 10000);
  }


  public ngOnDestroy(): void {
    // Remove the symbol subscription
    this.priceService.removeSymbolRequest(this.exgStock);
  }
}
