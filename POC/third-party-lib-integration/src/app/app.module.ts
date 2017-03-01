import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // for two-way data binding
import { AppComponent } from './app.component';
import { HeroService } from './hero.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MockFormatterPipe } from './mock-formatter.pipe';

@NgModule({
  imports: [ BrowserModule ,
    FormsModule ,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [ AppComponent, HeroesComponent, DashboardComponent, HeroDetailComponent, MockFormatterPipe ],
  providers: [HeroService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
