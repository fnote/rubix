import { ActivatedRoute, NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable()
export class NavigationService {

	constructor(private router: Router, private location: Location, private route: ActivatedRoute) {}

	private backToParent(): void {
		this.location.back();
	}

	private goToChildView(path: Array<any>, data: Object): void  {
		const  configData: any = { queryParams: data, skipLocationChange: true };

		this.router.navigate(path, configData);
	}
}
