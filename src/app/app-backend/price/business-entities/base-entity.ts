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
}
