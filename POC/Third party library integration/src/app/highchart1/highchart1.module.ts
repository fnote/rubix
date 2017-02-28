import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highchart1Component } from './highchart1.component';
import { Ng2HighchartsModule } from 'ng2-highcharts';
import { HighchartRoutingModule } from './highchart1-routing.module';

@NgModule({
  imports: [
    CommonModule,
    Ng2HighchartsModule,
    HighchartRoutingModule
  ],
  declarations: [Highchart1Component],
  exports:      [],
  providers: [Highchart1Component]
})
export class HighChartModule { }
