import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketService } from './websocket/websocket.service';
import { AjaxService } from './ajax/ajax.service';
import { QueueMannagerService } from './websocket/queue-mannager.service';
import { DataService } from './data.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		WebsocketService,
		AjaxService,
		QueueMannagerService,
		DataService
	],
})
export class CommunicationModule { }
