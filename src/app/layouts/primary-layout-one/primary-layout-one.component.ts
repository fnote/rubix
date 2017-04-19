import { Component } from '@angular/core';

@Component({
	selector: 'app-primary-layout-one',
	templateUrl: './primary-layout-one.component.html',
})
export class PrimaryLayoutOneComponent {
	public navExpandClicked(): void {
		const body = document.getElementsByTagName('body')[0];
		body.classList.toggle('nav-expanded');
	}
}
