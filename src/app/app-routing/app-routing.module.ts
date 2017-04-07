import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { routes } from './app-routes';

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule { }
