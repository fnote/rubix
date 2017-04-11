import { Component } from '@angular/core';
import { ConfigService } from './config/config.service';
import { ThemeService } from './utils/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {

	constructor(private themeService: ThemeService, private configService: ConfigService) {
		this.configService.init();
	}
}
