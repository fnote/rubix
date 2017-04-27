import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app-backend/auth/auth.service';
import { Channels } from '../../../app-constants/enums/channels.enum';
import { Languages } from '../../../app-constants/enums/languages.enum';
import { LocalizationService } from '../../../utils/localization/localization.service';
import { Router } from '@angular/router';
import { WidgetLoaderService } from '../../widget-util/widget-loader.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

	public userName = '';
	public password = '';
	public rejectReson = '';
	public isAuthenticating = false;
	public authClass: {};

	constructor(private authService: AuthService, public router: Router,
		private widgetLoaderService: WidgetLoaderService, public localizationService: LocalizationService) { }

	public ngOnInit(): void {
		// implement this
	}

	private setAuthClass(): void {
		this.authClass =  {
			authenticateProgress: this.isAuthenticating,
			authError: !this.isAuthenticating,
		};
	}

	private authenticateUser(): void {
		this.authService.authenticateUser(this.userName, this.password);

		this.authService.checkAuthenticated().subscribe(authStatus => {
			if (authStatus.isAuthenticate) {
				const redirectURL = this.authService.redirectURL;
				if (redirectURL) {
					this.router.navigateByUrl(redirectURL);
				} else {
					this.widgetLoaderService.loadDefaultTab();
				}
			} else {
				this.isAuthenticating = false;
				this.rejectReson = authStatus.rejectReson;
				this.setAuthClass();
			}
		});
	}

	private checkUserInputs(): boolean {
		if (this.userName === '' || this.password === '') {
			this.isAuthenticating = false;
			this.rejectReson = 'Enter User Name & password';
			return false;
		}else {
			return true;
		}
	}

	public login(): void {
		if (this.checkUserInputs()) {
			this.isAuthenticating = true;
			this.rejectReson = 'Authenticating....';
			this.authenticateUser();
		}
		this.setAuthClass();
	}

	public changeLanguage(): void {
		if (this.localizationService.activeLanguageCode === Languages.EN) {
			this.localizationService.activeLanguageCode = Languages.AR;
		} else {
			this.localizationService.activeLanguageCode = Languages.EN;
		}
	}
}
