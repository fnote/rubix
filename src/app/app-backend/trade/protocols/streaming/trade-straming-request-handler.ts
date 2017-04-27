import { DeviceChannels } from '../../../../app-constants/enums/device-channels.enum';
import { SystemRequestTypes } from '../../../../app-constants/enums/trade-meta/system/system-request-types.enum';
import { TradeMetaGroups } from '../../../../app-constants/enums/trade-meta/trade-meta-groups.enum';
import { UserState } from '../../../../model/user-state';

export class TradeStreamingRequestHandler {
	private static _instance: TradeStreamingRequestHandler = new TradeStreamingRequestHandler();

	public static getInstance(): TradeStreamingRequestHandler {
		return TradeStreamingRequestHandler._instance;
	}

	constructor() {
		if (TradeStreamingRequestHandler._instance) {
			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
		}

		TradeStreamingRequestHandler._instance = this;
	}

	public genaratePulseRequest(): Object {
		const pulseRequet = {
			HED: {
				VER: 'DFN_JSON_1.0',
				MSG_GRP: TradeMetaGroups.System,
				MSG_TYP: SystemRequestTypes.Pulse,
				CHNL_ID: DeviceChannels.Web,
				SESN_ID: UserState.getInstance().getTradeDetails().SESN_ID,
			},
			DAT: {},
		};
		return pulseRequet;
	}
}
