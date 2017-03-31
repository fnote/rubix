export class BaseEntity {

	private _isMetaDataLoaded = false;
	private _isStreamingDataLoaded = false;

	public get isMetaDataLoaded(): boolean  {
		return this._isMetaDataLoaded;
	}

	public set isMetaDataLoaded(value: boolean) {
		this._isMetaDataLoaded = value;
	}

	public get isStreamingDataLoaded(): boolean {
		return this._isStreamingDataLoaded;
	}

	public set isStreamingDataLoaded(value: boolean) {
		this._isStreamingDataLoaded = value;
	}

	public setValues(values: Object = {}): void {
		Object.assign(this, values);
	}

	public printObj(): void {
		for (const key in this) {
			if (this.hasOwnProperty(key)) {
				/* tslint:disable */
				console.log(key + ' : ' + this[key]);
				/* tslint:enable */
			}
		}
	}
}
