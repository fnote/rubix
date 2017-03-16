import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { UtilsModule } from './utils/utils.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ChildComponent } from './child/child.component';

@NgModule({
	declarations: [ AppComponent ,
					ChildComponent ],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		UtilsModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
