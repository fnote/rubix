import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketService } from './websocket/websocket.service';
import { QueueMannagerService } from './websocket/queue-mannager.service';
import { DataService } from './data.service';
import { ConfigService } from '../config/config.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		WebsocketService,
		QueueMannagerService,
		DataService,
		ConfigService
	],
})
export class CommunicationModule { }
