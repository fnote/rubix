import { Component } from '@angular/core';
import {UtilsService} from './utils/utils.service';
import {HelperService} from './utils/helper/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Rubix test page';
  result: string;
  inputValues: string;

  constructor( private helperService: HelperService) {}

  convert(): void {
    console.log(this.helperService.getMonth('Jan'));
    console.log(this.helperService.formatDate('20170218142324' , 'yyyy-MM-dd h:mm:ss' , {hour : 1 , min : 1}));
  }
}
