import * as Rx from 'rxjs/Rx';
import { PulseService } from './websocket/pulse.service';

export interface Connection {
	channel: number;
	url: string;
	connectedSocket: Rx.Subject<MessageEvent>;
	sendMessageQueue: Array<any>;
	isConnected: boolean;
	isConnecting: boolean;
	sendQueueProcessInterval: NodeJS.Timer;
	subscription: any;
	pulseService: PulseService;
}
