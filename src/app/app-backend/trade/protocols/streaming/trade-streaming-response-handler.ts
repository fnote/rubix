import { AuthenticationResponseTypes } from '../../../../app-constants/enums/trade-meta/authentication/authentication-response-types.enum';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../../../app-utils/logger.service';
import { StreamRouteService } from '../../../communication/stream-route.service';
import { Subject } from 'rxjs/Rx';
import { SystemResponseTypes } from '../../../../app-constants/enums/trade-meta/system/system-response-types.enum';
import { TradeMetaGroups } from '../../../../app-constants/enums/trade-meta/trade-meta-groups.enum';

@Injectable()
export class TradeStreamingResponseHandler {

	private tradeResponseStream$: Subject<Object>;
	private authenticationResponseStream$: Subject<Object>;

	constructor(private streamRouteService: StreamRouteService, private loggerService: LoggerService) {
		this.tradeResponseStream$ = new Subject();
		this.authenticationResponseStream$ = new Subject();
		this.updateTradeResponseStream();
	}

	public getAuthenticationResponseStream(): Subject<any> {
		return this.authenticationResponseStream$;
	}

	private updateTradeResponseStream(): void {
		this.streamRouteService.getTradeResponseStream().map(response => {
			return this.processTradeResponse(response.data);
		}).subscribe(response => {
			this.tradeResponseStream$.next(response);
			this.updateTradeModel(response);
		});
	}

	private processTradeResponse(response: string): Object {
		let processResponse = {};
		try {
			processResponse = JSON.parse(response);
		} catch (error) {
			this.loggerService.logError(error, 'TradeStreamingResponseHandler');
		}
		return processResponse;
	}

	private updateTradeModel(response: any): void {
		if (response && response.DAT && response.HED) {
			switch (response.HED.MSG_GRP) {
				case TradeMetaGroups.Authentication:
					switch (response.HED.MSG_TYP) {
						case AuthenticationResponseTypes.AuthNormal:
							this.authenticationResponseStream$.next(response);
							break;
						default:
							this.loggerService.logError('No response type under group - ' + TradeMetaGroups.Authentication , 'TradeStreamingResponseHandler');
					}
					break;
				case TradeMetaGroups.System:
					switch (response.HED.MSG_TYP) {
						case SystemResponseTypes.Pulse:
							// this.loggerService.logInfo('Pulse Recived', 'TradeStreamingResponseHandler');
							break;
						default:
							this.loggerService.logError('No response type under group - ' + TradeMetaGroups.System , 'TradeStreamingResponseHandler');
					}
					break;
				default:
					this.loggerService.logError('No response group - ' + response.HED.MSG_GRP , 'TradeStreamingResponseHandler');

			}
		}
	}
}
