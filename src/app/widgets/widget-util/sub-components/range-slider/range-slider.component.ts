import { Component, OnInit } from '@angular/core';
import { CommonHelperService } from '../../../../utils/helper/common-helper.service';
import { ReflectiveInjector } from '@angular/core';

@Component({
	selector: 'app-range-slider',
	templateUrl: './range-slider.component.html',
})
export class RangeSliderComponent implements OnInit {
	private percentage = 0;
	public dispPercentage = '';
	public percentageStyle = 'style="width:0%;"';
	private commonHelperService: CommonHelperService;

	constructor(public title: string, private value1: number, private value2: number) {
		const injector = ReflectiveInjector.resolveAndCreate([CommonHelperService]);
		this.commonHelperService = injector.get(CommonHelperService);
	}

	public setValues(value1: number, value2: number): void {
		this.value1 = value1;
		this.value2 = value2;

		this.calculatePercentage();
	}

	public ngOnInit(): void {
		this.calculatePercentage();
	}

	private calculatePercentage(): void {
		const total = this.value1 + this.value2;
		if (total > 0) {
			this.percentage = this.value1 * 100 / total;
		} else {
			this.percentage = 0;
		}

		this.dispPercentage = this.commonHelperService.formatNumber(this.percentage, 2) + '%';
		this.percentageStyle = 'style="width:' + Math.round(this.percentage) + '%;"';
	}
}
