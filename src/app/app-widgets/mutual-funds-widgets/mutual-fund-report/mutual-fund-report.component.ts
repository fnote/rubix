import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { Component, OnInit, Injector } from '@angular/core';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';
import { ConfigService } from '../../../app-config/config.service';
import { LoggerService } from '../../../app-utils/logger.service';
import { UserState } from '../../../app-backend/auth/user-state';

@Component({
	selector: 'app-mutual-fund-report',
	templateUrl: './mutual-fund-report.component.html',
	styleUrls: ['./mutual-fund-report.component.scss'],
})
export class MutualFundReportComponent extends BaseWidgetComponent implements OnInit {

	constructor(injector: Injector, private configService: ConfigService, private mutDataStore: MutualFundsDataStore, private logger: LoggerService) {
		super(injector);
	}

	public pdfUrl: string;
	public symbolCode: string;
	public exchangeCode: string;

	public data: [number, { file: string ,month: string}[]][];
	public files: { file: string ,month: string}[];
	public selectedYear: number;
	public selectedMonth: string;

	public ngOnInit(): void {

		this.mutDataStore.detailDataLoadedObserver.subscribe((value) => {
			this.symbolCode = this.route.snapshot.queryParams['symbolCode'];
			this.exchangeCode = this.route.snapshot.queryParams['exchangeCode'];

			this.data = this.mutDataStore.getMutualFundReportData(this.symbolCode);
			this.selectedYear = this.data[0][0];
			this.files = this.data[0][1];
			this.loadPdf(this.selectedYear, this.files[0].month, this.files[0].file);
		});
	}

	public onYearChange(evt): void {
		this.selectedYear = parseInt(evt.target.value, 10);
		this.files = this.data.find((entry) => { return entry[0] === this.selectedYear })[1];
		this.loadPdf(this.selectedYear, this.files[0].month, this.files[0].file);
	}

	public onMonthChange(evt): void {
		this.selectedMonth = evt.target.value;
		const file = this.files.find((entry) => {
			return entry.month === this.selectedMonth
		});
		this.loadPdf(this.selectedYear, file.month, file.file);
	}

	private loadPdf(year: number, month: string, fileName: string): void {
		const SESSION_ID = UserState.getInstance().getPriceDetails().SESSION;

		this.configService.getStringConfigVal('connectionConfig', 'price', 'ajax_url').then(url => {
			this.pdfUrl = url + '/download/factsheet/' + this.exchangeCode + '/' + this.symbolCode + '/' + year + '/' + month + '/' + fileName + '?22=' + SESSION_ID;
			//this.dataService.sendAjaxRequest(request);
		});
	}
}
