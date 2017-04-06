import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [],
	providers: [
		AuthService,
	],
})
export class AuthModule { }
