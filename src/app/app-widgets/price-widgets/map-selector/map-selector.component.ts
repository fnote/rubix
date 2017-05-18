import { Component, Injector, OnInit } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { CountryList } from './country-list';
import { GmsMapDataStore } from '../../../app-backend/price/data-stores/gms-map-data-store';
import { PriceService } from '../../../app-backend/price/price.service';
import { WorldMap } from './world-map';

@Component({
	selector: 'app-map-selector',
	templateUrl: './map-selector.component.html',
	styleUrls: ['./map-selector.component.scss'],
})
export class MapSelectorComponent  extends BaseWidgetComponent {

	private options: Object;
	private lblSec0 = 0;
	private lblSec1 = 0.5;
	private lblSec2 = 1;
	private allIndeces;
	public selectedIndexList;
	private title = 'All indices';

	public setIndicesForCountry(event: any): void {
		if (event == null) {
			this.selectedIndexList = this.gmsMapDataStore.getAllIndexList();
			this.title = 'All indices';
		} else {
			this.selectedIndexList = [];
			const cc = event.context.code;
			const ind = [];
			for (const idx of this.gmsMapDataStore.getAllIndexList()) {
				if (idx.code === cc || cc == null) {
					ind.push(idx);
				}
			}
			this.title = 'Indices of ' + event.context.name;
			this.selectedIndexList = ind;
		}
	}

	public onInit(): void {

		console.log("Oninit");
		const exgs = [
			'EXG',
			'EXGFE',
		];
		this.priceService.addGMSMapSymbolList(exgs);
        //
	}

	constructor(private priceService: PriceService, private gmsMapDataStore: GmsMapDataStore, injector: Injector) {
		super(injector);
		this.allIndeces = this.gmsMapDataStore.getAllIndexList();
		this.selectedIndexList = this.gmsMapDataStore.getAllIndexList();
		this.loadMap();
	}

	private loadMap(): void {
		this.options = {
			chart: {
				reflow: true,
				animation: false,
			},

			title: {
				text: 'World Markets',
			},

			legend: {
				title: {
					text: 'Profit and Loss distribution',
				},

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
					formatter: function (){
						if (this.isFirst) {
							return 'Loss';
						} else if (this.isLast) {
							return 'Profit';
						}
					}
				}
			},

			mapNavigation: {
				enabled: true,
				buttonOptions: {
					verticalAlign: 'bottom',
				},
			},


			series: [{
				data: this.allIndeces,
				mapData: WorldMap,
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
				tooltip: {
					valuePrefix: '$',
				},
			},
			],
		};
	}

	private onChartSelection (event: any): void {
		// if (event.context) {
		// 	this.setIndicesForCountry(event.context.code);
		// }
	}

	private onUnselect (event: any): void {
		// Not implemented
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
