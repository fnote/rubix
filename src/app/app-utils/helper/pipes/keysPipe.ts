import { Pipe, PipeTransform } from '@angular/core';

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
