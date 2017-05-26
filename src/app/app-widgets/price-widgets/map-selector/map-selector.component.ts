import { Component, Injector, OnInit } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { IndexDataStore } from '../../../app-backend/price/data-stores/index-data-store';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { PriceService } from '../../../app-backend/price/price.service';
import { WorldMapCordinates } from './world-map-cordinates';

@Component({
	selector: 'app-map-selector',
	templateUrl: './map-selector.component.html',
	styleUrls: ['./map-selector.component.scss'],
})

export class MapSelectorComponent extends BaseWidgetComponent {
	private options: Object;
	private lblSec0 = 0;
	private lblSec1 = 0.5;
	private lblSec2 = 1;
	public allIndeces = [];
	public selectedIndexList;
	private title = 'All indices';

	constructor(private priceService: PriceService, private indexDataStore: IndexDataStore,
		private injector: Injector, public localizationService: LocalizationService) {
		super(injector);
		this.indexDataStore.indicesLodingState.subscribe(() => this.onDataLoad());
	}

	public onInit(): void {
		const exgs = [
			'TDWL',
			'CASE',
			'ISE',
			'DFM',
		];
		const segs = [
			'GMS',
		];
		this.priceService.addIndexList(exgs, segs);
	}

	public setIndicesForCountry(event: any): void {
		if (event == null) {
			this.selectedIndexList = this.indexDataStore.getAllIndexList();
			this.title = 'All indices';
		} else {
			this.selectedIndexList = [];
			const cc = event.context.code;
			const ind = [];
			for (const idx of this.indexDataStore.getAllIndexList()) {
				if (idx.code === cc || cc == null) {
					ind.push(idx);
				}
			}
			this.title = 'Indices of ' + event.context.name;
			this.selectedIndexList = ind;
		}
	}

	private onDataLoad(): void {
		this.selectedIndexList = this.indexDataStore.getAllIndexList();
		this.loadMap();
	}

	private loadMap(): void {
		this.allIndeces = this.indexDataStore.getAllIndexList();
		this.options = {
			chart: {
				reflow: true,
				animation: false,
				height: 600,
			},

			title: {
				text: '',
				enabled: false,
			},

			tooltip: {
				enabled: false,
			},

			legend: {
				title: {
					text: this.localizationService.language.BEST_BID,
				},
				enabled: false,
			},

			colorAxis: {
				min: 1,
				max: 1000,
				type: 'logarithmic',
				stops: [
					[this.lblSec0, '#DF013A'],
					[this.lblSec1, '#868A08'],
					[this.lblSec2, '#088A08'],
				],
				tickPixelInterval: 100,
				minColor: '#efecf3',
				maxColor: '#990041',
				labels: {
					formatter: function (): string{
						if (this.isFirst) {
							return 'Loss';
						} else if (this.isLast) {
							return 'Profit';
						}
					},
				},
			},

			mapNavigation: {
				enabled: true,
				buttonOptions: {
					verticalAlign: 'bottom',
				},
			},

			series: [{
				data: this.allIndeces,
				mapData: WorldMapCordinates,
				joinBy: ['iso-a2', 'code'],

				allowPointSelect: true,
				states: {
					hover: {
						color: '#a4edba',
					},
					select: {
						color: '#EFFFEF',
						borderColor: 'black',
						dashStyle: 'dot',
					},
				},
			},
			],
		};
	}

	private onChartSelection (event: any): void {
		// Not implemented yet
	}

	private onUnselect (event: any): void {
		// Not implemented yet
	}

	private onMouseOver (event: any): void {
		if (event.context) {
			this.setIndicesForCountry(event);
		}
	}

	private onMouseOut (event: any): void {
		this.setIndicesForCountry(null);
	}
}
