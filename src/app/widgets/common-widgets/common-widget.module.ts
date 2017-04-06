import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login-widget/login.component';
import { NgModule } from '@angular/core';
import { RubixTestPageComponent } from './rubix-test-page/rubix-test-page.component';

@NgModule({
	imports: [CommonModule, FormsModule],
	declarations: [
		LoginComponent,
		RubixTestPageComponent,
	],
})
export class CommonWidgetModule { }
