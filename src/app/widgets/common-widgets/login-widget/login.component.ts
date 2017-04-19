import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app-backend/auth/auth.service';
import { Channels } from '../../../constants/enums/channels.enum';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

	public userName = '';
	public password = '';

	constructor(private authService: AuthService, public router: Router) { }

	public ngOnInit(): void {
		// implement this
	}

	public login(): void {
		this.authService.authenticateUser(this.userName, this.password);

		this.authService.checkAuthenticated().subscribe(authStatus => {
			if (authStatus) {
				const redirect = this.authService.redirectURL ? this.authService.redirectURL : '/test';
				this.router.navigateByUrl(redirect);
			}

		});
	}
}
