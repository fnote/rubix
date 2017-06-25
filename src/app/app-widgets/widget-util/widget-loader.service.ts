import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetLoaderService {
	private layoutObj: any;

	constructor(private router: Router, private http: Http, private route: ActivatedRoute) { }

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

	public getTabs(): Promise<any> {
		return new Promise((resolve, reject) => {
			if (!this.layoutObj) {
				this.http.get('./config/app-layout.json').map((res) => res.json()).subscribe(data => {
					this.layoutObj = data;
					resolve(this.getLayoutObj());
				});
			} else {
				resolve(this.getLayoutObj());
			}
		});
	}

	public loadDefaultTab(): void {
		this.getTabs().then(layoutObj => {
			const sideBar = layoutObj.routes[0].model[0].model[0];
			const staticUrl = '/' + layoutObj.routes[0].path + '/(' + sideBar.outlet + ':' + sideBar.path;
			this.router.navigateByUrl(staticUrl + this.getUrlforTab(layoutObj.routes[0].model[1].model[0]) + ')');
		});
	}

	private getLayoutObj(): any {
		return this.layoutObj;
	}
}
