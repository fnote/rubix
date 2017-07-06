import { Component } from '@angular/core';
import { UserState } from './app-backend/auth/user-state';
import { environment } from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	public version = environment.version;
	public isAuthenticated = UserState.getInstance().isAuthenticated;
}
