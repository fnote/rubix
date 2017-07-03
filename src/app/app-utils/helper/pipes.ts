import { Pipe, PipeTransform } from '@angular/core';

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

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
	public transform(value: any, args: string[]): any {
		if (!value) {
			return [];
		}
		const keys = [];
		for (const key in value) {
			if (value.hasOwnProperty(key)) {
				keys.push({ key: key, value: value[key] });
			}
		}
		return keys;
	}
}

@Pipe({ name: 'conditionalClasses' })
export class ConditionalClassesPipe implements PipeTransform {
	public transform(value: any, class1: string, class2: string): string {
		if (value > 0) {
			return class1;
		} else if (value < 0) {
			return class2;
		}else {
			return '';
		}
	}
}
