import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from 'app/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login-component.html'
})

export class LoginComponent {

    constructor(public authService: AuthService, public router: Router) {
    }

    login() {
        this.authService.login().subscribe(() => {
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
                // Redirect the user
                this.router.navigateByUrl(redirect);
            }
        });
    }

    logout() {
        this.authService.logout();
    }
}
