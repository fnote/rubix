import { PriceRequest } from '../price-request';
import { PriceRequestTypes } from '../../../../app-constants/enums/price-request-types.enum';

export class PriceStreamingRequestHandler {

	private static _instance: PriceStreamingRequestHandler = new PriceStreamingRequestHandler();

	public static getInstance(): PriceStreamingRequestHandler {
		return PriceStreamingRequestHandler._instance;
	}

	constructor() {
		if (PriceStreamingRequestHandler._instance) {
			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
		}

		PriceStreamingRequestHandler._instance = this;
	}

	public generateAuthRequest(authParams: {priceVerion: string, userName: string, password: string, userType: string,
		subType: string, brokerCode: string, omsId: number}): string {
		const fs = '\u001C';
		const ds = '\u0002';
		const AUTHENTICATION_REQUEST_VERSION_TAG = 150;
		const USER_NAME_TAG = 20;
		const USER_PASSWORD_TAG = 21;
		const USER_TYPE_TAG = 24;
		const USER_SUB_TYPE_TAG = 1000;
		const OMS_ID_TAG = 19;
		const BROKER_CODE_TAG = 1;

		return [
			[AUTHENTICATION_REQUEST_VERSION_TAG, authParams.priceVerion].join(ds),
			[USER_NAME_TAG, authParams.userName].join(ds),
			[USER_PASSWORD_TAG, authParams.password].join(ds),
			[USER_TYPE_TAG, authParams.userType].join(ds),
			[USER_SUB_TYPE_TAG, authParams.subType].join(ds),
			[OMS_ID_TAG, authParams.omsId].join(ds),
			[BROKER_CODE_TAG, authParams.brokerCode].join(ds),
		].join(fs);
	}

	public generateSecondaryAuthRequest(authParams: {priceVerion: string, userName: string, password: string,
		userType: string, subType: string, session: string, brokerCode: string, omsId: number}): string {
		const fs = '\u001C';
		const ds = '\u0002';
		const AUTHENTICATION_REQUEST_VERSION_TAG = 150;
		const USER_NAME_TAG = 20;
		const USER_PASSWORD_TAG = 21;
		const SESSION_ID_TAG = 22;
		const USER_TYPE_TAG = 24;
		const USER_SUB_TYPE_TAG = 1000;
		const OMS_ID_TAG = 19;
		const CONNECTION_TYPE_TAG = 132;
		const BROKER_CODE_TAG = 1;

		const myarray = ['abc' , 'xyz', 'mno'];

		return [
			[AUTHENTICATION_REQUEST_VERSION_TAG, authParams.priceVerion].join(ds),
			[USER_NAME_TAG, authParams.userName].join(ds),
			[USER_PASSWORD_TAG, authParams.password].join(ds),
			[SESSION_ID_TAG, authParams.session].join(ds),
			[USER_TYPE_TAG, authParams.userType].join(ds),
			[USER_SUB_TYPE_TAG, authParams.subType].join(ds),
			[CONNECTION_TYPE_TAG, '0'].join(ds),
			[OMS_ID_TAG, authParams.omsId].join(ds),
			[BROKER_CODE_TAG, authParams.brokerCode].join(ds),
		].join(fs);
	}

	public genaratePulseRequest(): Object {
		const pulseRequest = {
			MT: PriceRequestTypes.Pulse,
		};
		return pulseRequest;
	}

	public generateSSOAuthRequest(authParams: Object = {}): string {
		return 'sso auth request';
	}

	public generateAddRequest(req: PriceRequest): string {
		req.rt = 1;
		return req.buildMessage();
	}

	public generateAddAjaxRequest(url: string, sessionID: string, req: PriceRequest): string {
		req.rt = 1;
		const priceReq = req.buildMessage();
		//TODO : url creation should be strategic
		return url + '/bl?22=' + sessionID + '&24=30&1000=1&req=' + priceReq;
	}

	public generateRemoveRequest(req: PriceRequest): string {
		req.rt = 0;
		return req.buildMessage();
	}

	public generateMetaRequest (req: PriceRequest): string {
		return req.buildMessage();
	}
}
