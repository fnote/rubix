import { DataStore } from './data-store';

export class Depth extends DataStore {

	constructor(values : Object = {}) {
		super();
		Object.assign(this, values);
	}
}
