import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from './utils.service';
import { HelperService } from './helper/helper.service';
import { TradeHelperService } from './helper/trade-helper.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [],
  providers: [
    UtilsService,
    HelperService
    ],
})
export class UtilsModule { }
