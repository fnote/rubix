import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsocketService } from './websocket/websocket.service';
import { AjaxService } from './ajax/ajax.service';
import { QueueMannagerService } from './websocket/queue-mannager.service';
import { DataService } from './data.service';
import { StreamRouteService } from './stream-route.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		WebsocketService,
		AjaxService,
		QueueMannagerService,
		DataService,
		StreamRouteService
	],
})
export class CommunicationModule { }
