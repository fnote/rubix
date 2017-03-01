import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WebsocketService } from './websocket/websocket.service';
import {QueueMannagerService} from './websocket/queue-mannager.service';
import { DataService } from './data.service';

import { AppComponent } from './app.component';


@NgModule({
	declarations: [
	AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [WebsocketService, QueueMannagerService, DataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
