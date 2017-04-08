import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetLoaderService {

	constructor(private router: Router, private route: ActivatedRoute) { }

	public loadTab(tab: any): void {
		const staticUrl = this.router.url.split('//')[0];
		this.router.navigateByUrl(staticUrl + this.getUrlforTab(tab) + ')');
	}

	public getUrlforTab(tab: any): string { // TODO: [Malindu] Check for improvements
		let url = ['//' , tab.outlet , ':' , tab.path , '/('];
		for (const item of tab.model){
			url = url.concat(item.outlet , ':' , item.path , '//');
		}
		url.push(')');
		return url.join('');
	}
}
