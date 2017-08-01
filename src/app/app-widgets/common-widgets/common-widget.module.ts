import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header-widget/header.component';
import { HomeComponent } from './home-widget/home.component';
import { LoginATComponent } from  './login-AT-widget/login-AT.component';
import { LoginComponent } from './login-widget/login.component';
import { MdButtonModule } from '@angular/material';
import { MdTableModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RubixTestPageComponent } from './rubix-test-page/rubix-test-page.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CdkTableModule } from '@angular/cdk';
import { MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [CommonModule, FormsModule, MdButtonModule , MdTableModule , CdkTableModule , MdInputModule , BrowserAnimationsModule ],
	declarations: [
		LoginComponent,
		RubixTestPageComponent,
		SideBarComponent,
		LoginATComponent,
		HomeComponent,
		HeaderComponent,
	],
})
export class CommonWidgetModule { }
