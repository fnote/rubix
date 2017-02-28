import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Highchart1Component } from './highchart1.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'h1', component: Highchart1Component }
  ])],
  exports: [RouterModule]
})
export class HighchartRoutingModule {}
