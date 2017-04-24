import { CommonModule } from '@angular/common';
import { NetworkService } from './network.service';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [
		CommonModule,
	],
	providers: [NetworkService],
	declarations: [],
})
export class NetworkModule {
}
