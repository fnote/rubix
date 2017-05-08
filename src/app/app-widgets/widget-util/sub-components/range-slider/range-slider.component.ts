import { Component, Input, OnChanges, ReflectiveInjector, SimpleChanges } from '@angular/core';
import { CommonHelperService } from '../../../../app-utils/helper/common-helper.service';

@Component({
	selector: 'app-range-slider',
	templateUrl: './range-slider.component.html',
})
export class RangeSliderComponent implements OnChanges {
	@Input() public title: string;
	@Input() public lowVal: number;
	@Input() public highVal: number;
	@Input() public refVal: number;

	public dispPercentage = '';
	public percentage = 0;
	private commonHelperService: CommonHelperService;

	constructor() {
		const injector = ReflectiveInjector.resolveAndCreate([CommonHelperService]);
		this.commonHelperService = injector.get(CommonHelperService);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['lowVal'] || changes['highVal'] || changes['refVal']) {
			this.calculatePercentage();
		}
	}

	private calculatePercentage(): void {
		let value = 0;
		if (this.refVal > 0 && this.highVal > 0 && this.lowVal > 0 && this.highVal !== this.lowVal) {
			value = (this.refVal - this.lowVal) * 100 / (this.highVal - this.lowVal);
		}

		this.dispPercentage = this.commonHelperService.formatNumber(value, 2) + '%';
		this.percentage = Math.round(value);
	}
}
