import { Component, Input, OnInit } from '@angular/core';
import { CommonHelperService } from '../../../../utils/helper/common-helper.service';
import { ReflectiveInjector } from '@angular/core';

@Component({
	selector: 'app-range-slider',
	templateUrl: './range-slider.component.html',
})
export class RangeSliderComponent implements OnInit {
	@Input() public title: string;
	@Input() private lowVal: number;
	@Input() private highVal: number;
	@Input() private refVal: number;

	public dispPercentage = '';
	public percentageStyle = 'style="width:0%;"';
	private commonHelperService: CommonHelperService;

	constructor() {
		const injector = ReflectiveInjector.resolveAndCreate([CommonHelperService]);
		this.commonHelperService = injector.get(CommonHelperService);
	}

	public ngOnInit(): void {
		this.calculatePercentage();
	}

	private calculatePercentage(): void {
		let value = 0;
		if (this.refVal > 0 && this.highVal > 0 && this.lowVal > 0 && this.highVal !== this.lowVal) {
			value = (this.refVal - this.lowVal) * 100 / (this.highVal - this.lowVal);
		}

		this.dispPercentage = this.commonHelperService.formatNumber(value, 2) + '%';
		this.percentageStyle = 'style="width:' + Math.round(value) + '%;"';
	}
}
