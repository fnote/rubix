import { ActivatedRoute, NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable()
export class NavigationService {
	private navWidgetStack: Array<string> = [];
	constructor(private router: Router, private location: Location, private route: ActivatedRoute) {}

	private backToParent(): void {
		this.router.navigateByUrl(this.navWidgetStack.pop());
	}

	private goToChildView(path: Array<any>, data: Object): void  {
		const  configData: any = { queryParams: data, skipLocationChange: true };

		this.router.navigate(path, configData);
		this.navWidgetStack.push(this.router.routerState.snapshot.url);
	}
}
