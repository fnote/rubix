import { Component } from '@angular/core';
import { ThemeService } from './app-utils/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {

	constructor(private themeService: ThemeService) {
	}
}
