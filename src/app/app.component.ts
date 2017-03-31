import { Component } from '@angular/core';
import { ThemeService } from './utils/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {

	constructor(private themeService: ThemeService) { }
}
