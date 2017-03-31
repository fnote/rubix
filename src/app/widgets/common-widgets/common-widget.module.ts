import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PriceLoginComponent } from './login-widget/price-login.component';
import { RubixTestPageComponent } from './rubix-test-page/rubix-test-page.component';

@NgModule({
	imports: [CommonModule, FormsModule],
	declarations: [
		PriceLoginComponent,
		RubixTestPageComponent,
	],
})
export class CommonWidgetModule { }
