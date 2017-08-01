import {AuthenticationRequestTypes} from '../../../app-constants/enums/trade-meta/authentication/authentication-request-types.enum';
import {BaseAuthHandler} from '../base-auth-handler';
import {Channels} from '../../../app-constants/enums/channels.enum';
import {DeviceChannels} from '../../../app-constants/enums/device-channels.enum';
import {Md5} from 'ts-md5/dist/md5';
import {TradeMetaGroups} from '../../../app-constants/enums/trade-meta/trade-meta-groups.enum';

export class ATAuthHandler extends BaseAuthHandler {

	private static instance: ATAuthHandler;

	public static getInstance(): ATAuthHandler {
		ATAuthHandler.instance = ATAuthHandler.instance || new ATAuthHandler();
		return ATAuthHandler.instance;
	}

	constructor() {
		super();
		if (ATAuthHandler.instance) {
			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
		}
	}

//buildinng an authentication request to send to trade
	public buildAuthRequest(userName: string, password: string): any {

		const authRequest = {
			DAT: this.getATAuthBody(userName, password),
			HED: this.getATAuthHeader(),
		};
		const request = {
			method: 'POST',
			url: 'http://127.0.0.1:8080/mfg-back-office/services/omsServices/ ',
			body: authRequest,
		};
		return request;
	}

	public processAuthRseponse(response: any): void {
		// code here
	}

	private getATAuthHeader(): any {
		const atAuthHeder = {
			MSG_GRP: 1,
			MSG_TYP: 1,
			CL_VER: 'WEBAT_1.0',
			CHANNEL: 7,
			SESSION: '',
			CL_IP: '192.168.20.183',
			// CL_REQ_ID: '',
			// VER: 'DFN_JSON_2.0',
			// USR_ID: '',
			// LANG_ID: 'EN',
		};
		return atAuthHeder;
	}

	private getATAuthBody(userName: string, password: string): any {
		const atAuthBody = {
			UN: userName,
			PWD: password,
		};
		return atAuthBody;
	}
}
