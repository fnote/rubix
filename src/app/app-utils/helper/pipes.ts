import { Pipe, PipeTransform } from '@angular/core';
import { CommonHelperService } from './common-helper.service';

@Pipe({ name: 'formatArrowForBidAskDif' })
export class FormatArrowForBidAskDifPipe implements PipeTransform {

	public transform(value: string): Object {
		const cssObj = { fa : true, 'fa-2x' : true };
		if (parseFloat(value) > 0) {
			cssObj['fa-long-arrow-up'] = true;
		}
		return cssObj;
	}
}
