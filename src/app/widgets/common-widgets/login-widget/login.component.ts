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
	public rejectReson = '';
	private authProgress = false;
	public authClass: {};

	constructor(private authService: AuthService, public router: Router) { }

	public ngOnInit(): void {
		// implement this
	}

	private setAuthClass(): void {
		this.authClass =  {
			authenticateProgress: this.authProgress,
			authError: !this.authProgress,
		};
	}

	private authenticateUser(): void {
		this.authService.authenticateUser(this.userName, this.password);

		this.authService.checkAuthenticated().subscribe(authStatus => {
			if (authStatus.isAuthenticate) {
				const redirect = this.authService.redirectURL ? this.authService.redirectURL : '/test';
				this.router.navigateByUrl(redirect);
			}else {
				this.authProgress = false;
				this.rejectReson = authStatus.rejectReson;
				this.setAuthClass();
			}
		});
	}

	private checkUserInputs(): boolean {
		if (this.userName === '' || this.password === '') {
			this.authProgress = false;
			this.rejectReson = 'Enter User Name & password';
			return false;
		}else {
			return true;
		}
	}

	public login(): void {
		if (this.checkUserInputs()) {
			this.authProgress = true;
			this.rejectReson = 'Authenticating....';
			this.authenticateUser();
		}
		this.setAuthClass();
	}
}
