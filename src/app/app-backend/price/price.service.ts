import { Injectable } from '@angular/core';
import { DataManagers } from '../../utils/enums/data-managers.enum';
import { StockDataStore } from './data-stores/stock-data-store';

@Injectable()
export class PriceService {


	constructor() { }

    // Expose data managers
    public getDataManager (dmID: number) {
        DataStore dtStore = null;

        switch(dmID) {
            case DataManagers.Stock:
                dtStore = StockDataStore.getInstance();
                break;
        }

        return dtStore;
    }

    public getOrAddExchange(exchangeCode) {
        let exgObj = this.allExchangeStore[exchangeCode];

        if (!exgObj) {
            exgObj = new Exchange({
                code: exchangeCode
            });

            this.allExchangeStore[exchangeCode] = exgObj;
        }

        return exgObj;
    }
}
