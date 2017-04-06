import { BaseAuthHandler } from '../base-auth-handler';
import { Channels } from '../../../constants/enums/channels.enum';
import { Md5 } from 'ts-md5/dist/md5';
import { TradeRequestGroups } from '../../../constants/enums/trade-request.groups.enum';
import { TradeRequestTypes } from '../../../constants/enums/trade-request.types.enum';


export class TradeAuthHandler extends BaseAuthHandler {
	constructor() {
		super();
	}

	public buildAuthRequest(userName: string, password: string): any {

		const authRequest = {
			DAT: this.getTradeAuthBody(userName, password),
			HED: this.getTradeAuthHeader(),
		};
		const request = {
			channel : Channels.Trade,
			data : JSON.stringify(authRequest),
		};
		return request;
	}

	private getTradeAuthHeader(): any {
		const tradeAuthHeder =  {
			MSG_GRP: TradeRequestGroups.Authentication,
			MSG_TYP: TradeRequestTypes.AuthNormal,
			CHNL_ID: 25,
			CL_VER: '1.0.4.49',
			CL_REQ_ID: '',
			SESN_ID: '',
			USR_ID: '',
			LANG_ID: 'EN',
			CL_IP: '',
			VER : 'DFN_JSON_3.0',
		};
		return tradeAuthHeder;
	}

	private getTradeAuthBody(userName: string, password: string): any {
		const tradeAuthBody = {
			LGN_NME: userName,
			EN_TYP: -1,
			PWD: Md5.hashStr(password),
			MAST_ACC_NUM: '',
			INST_ID: '',
		};
		return tradeAuthBody;
	}
}
