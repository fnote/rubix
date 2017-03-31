import { BaseEntity } from './base-entity';

export class DepthEntity extends BaseEntity {

	constructor(values: Object = {}) {
		super();
		this.setValues(values);
	}
}
