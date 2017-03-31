import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PriceLoginComponent } from './login-widget/price-login.component';
import { RubixTestPageComponent } from './rubix-test-page/rubix-test-page.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		PriceLoginComponent,
		RubixTestPageComponent,
	],
})
export class CommonWidgetModule { }

