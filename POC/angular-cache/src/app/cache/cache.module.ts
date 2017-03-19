import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkModule } from '../network/network.module';
import { CacheService } from './cache.service';

@NgModule({
	imports : [
		CommonModule,
		NetworkModule
	],
	declarations : [],
	providers : [CacheService]
})
export class CacheModule {
}
