import { CacheRequestGenerator } from './cache-request-generator';
import { CacheService } from './cache.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [],
	providers: [
		CacheRequestGenerator,
		CacheService,
	],
})
export class CacheModule {}
