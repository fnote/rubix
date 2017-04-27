import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../app-backend/auth/auth.service';
import { Injectable } from '@angular/core';
import { UserState } from '../../app-backend/auth/user-state';

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const url: string = state.url;
		return this.checkAuthenticated(url);
	}

	private checkAuthenticated(url: string): boolean {
		if (UserState.getInstance().isAuthenticated) {
			return true;
		}
		this.authService.redirectURL = url;
		this.router.navigate(['/login']);
		return false;
	}
}
