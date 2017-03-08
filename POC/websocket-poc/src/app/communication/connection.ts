import * as Rx from 'rxjs/Rx';
import { PulseService } from './websocket/pulse.service';

export interface Connection {
	channel : string;
	index : number;
	url : string;
	connectedSocket : Rx.Subject<MessageEvent>;
	sendMessageQueue : Array<any>;
	recivedMessageQueue : Array<any>;
	isConnected : boolean;
	sendQueueProcessInterval : any;
	recivedQueueProcessInterval : any;
	subscription : any;
	pulseService : PulseService;
}

