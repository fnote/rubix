import { BaseEntity } from './base-entity';

export class MarketEntity extends BaseEntity {

	constructor(values : Object = {}) {
		super();
		Object.assign(this, values);
	}
}
