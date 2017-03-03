import { Component } from '@angular/core';
import {UtilsService} from './utils/utils.service';
import {CommonHelperService} from './utils/helper/common-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Rubix test page';
  result: string;
  inputValues: string;

  constructor( private commonHelperService: CommonHelperService) {}

  convert(): void {
    console.log(this.commonHelperService.getMonth('Jan'));
    console.log(this.commonHelperService.formatDate('20170218142324' , 'yyyy-MM-dd h:mm:ss' , {hour : 1 , min : 1}));
  }
}
