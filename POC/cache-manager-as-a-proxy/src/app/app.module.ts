import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CacheModule } from './cache/cache.module';
import { CacheService } from './cache/cache.service';
import { CommunicationService } from './communication/communication.service';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    CacheService,
    CommunicationService
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
