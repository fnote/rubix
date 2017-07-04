import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-mutual-fund-report',
	templateUrl: './mutual-fund-report.component.html',
	styleUrls: ['./mutual-fund-report.component.scss'],
})
export class MutualFundReportComponent {

	public years: string[] = ['2016', '2017', '2018'];
	public months: string[] =  ['January', 'February', 'March'];
}
