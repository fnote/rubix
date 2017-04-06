import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app-backend/auth/auth.service';
import { Channels } from '../../../constants/enums/channels.enum';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

	private userName= '';
	private password= '';

	constructor(private authService: AuthService) {
		// code here
	}

	public ngOnInit(): void {
		// Test
	}

	public login(): void {
		this.authService.authenticateUser(this.userName, this.password);
	}
}
