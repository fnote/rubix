import { AjaxService } from './ajax/ajax.service';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { NgModule } from '@angular/core';
import { QueueMannagerService } from './websocket/queue-mannager.service';
import { StreamRouteService } from './stream-route.service';
import { WebsocketService } from './websocket/websocket.service';

@NgModule({
	imports: [CommonModule],
	declarations: [],
	providers: [
		WebsocketService,
		AjaxService,
		QueueMannagerService,
		DataService,
		StreamRouteService,
	],
})
export class CommunicationModule { }
