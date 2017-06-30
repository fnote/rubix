import { CachePolicy } from '../../app-constants/enums/cache-policy.enum';
import { Channels } from '../../app-constants/enums/channels.enum';

export class CacheRequest {
	private _channel: Channels;
	private _data: any;
	private _name: string;
	private _category: string;
	private _cachePolicy: CachePolicy;
	private _ttl: number;
	private _storeName: string;

	constructor(channel: Channels, data: any, name: string, category: string) {
		this._channel = channel;
		this._data = data;
		this._name = name;
		this._category = category;
	}

	public get channel(): Channels {
		return this._channel;
	}

	public set channel(value: Channels) {
		this._channel = value;
	}

	public get data(): any {
		return this._data;
	}

	public set data(value: any) {
		this._data = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get category(): string {
		return this._category;
	}

	public set category(value: string) {
		this._category = value;
	}

	public get cachePolicy(): CachePolicy {
		return this._cachePolicy;
	}

	public set cachePolicy(value: CachePolicy) {
		this._cachePolicy = value;
	}

	public get ttl(): number {
		return this._ttl;
	}

	public set ttl(value: number) {
		this._ttl = value;
	}

	public get storeName(): string {
		return this._storeName;
	}

	public set storeName(value: string) {
		this._storeName = value;
	}
}
