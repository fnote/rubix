import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app-backend/auth/auth.service';
import { Channels } from '../../../app-constants/enums/channels.enum';
import { Languages } from '../../../app-constants/enums/languages.enum';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { Router } from '@angular/router';
import { WidgetLoaderService } from '../../widget-util/widget-loader.service';

//above is imports required and where they can be found relative paths

@Component({
	selector: 'app-login', //referred everywhere as app-login
	templateUrl: './login.component.html', //templated used by login component
})
export class LoginComponent implements OnInit {

//assigning variables
	public userName = '';
	public password = '';
	public rejectReson = '';
	public isAuthenticating = false;
	public authClass: {};

//this is a dependency injection
	constructor(private authService: AuthService, public router: Router,
		private widgetLoaderService: WidgetLoaderService, public localizationService: LocalizationService) { }

	public ngOnInit(): void {
		this.testMethod().then(response => {
			alert(response);
		}).catch(error => {
			// err
		});
	}

	public login(): void {
		if (this.checkUserInputs()) { //if user has filled the fields
			this.isAuthenticating = true; //starts authenticating
			this.rejectReson = 'Authenticating....';
			this.authenticateUser();
		}
		this.setAuthClass();
	}

	public testMethod(): Promise<string> {
		const testPromise = new Promise((r, reject) => {
			// send ajax res
			// resolve - dta
			// reje -> data
			setTimeout(() => {
				r('hi');
			},10000);
		});
		return testPromise;
	}

	public changeLanguage(): void {
		if (this.localizationService.activeLanguageCode === Languages.EN) {
			this.localizationService.activeLanguageCode = Languages.AR;
		} else {
			this.localizationService.activeLanguageCode = Languages.EN;
		}
	}

//called from above
	private setAuthClass(): void {
		this.authClass =  {
			authenticateProgress: this.isAuthenticating,
			authError: !this.isAuthenticating,
		};
	}

	//called from above

	private authenticateUser(): void {
		//call authenticate user mtd in auth service pass username and passsword as arguments
		this.authService.authenticateUser(this.userName, this.password);

		//send the user to see whether it s authenticated and check authentication

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

//check whether user has filled all fields
	private checkUserInputs(): boolean {
		if (this.userName === '' || this.password === '') {// check if blank
			this.isAuthenticating = false;   //not authenticated if blank
			this.rejectReson = 'Enter User Name & password';// reason of rejection of entry
			return false;
		}else {
			return true;
		}
	}
}
