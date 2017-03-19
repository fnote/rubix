import {AngularCachePage} from "./app.po";

describe('angular-cache App', function () {
	let page: AngularCachePage;

	beforeEach(() => {
		page = new AngularCachePage();
	});

	it('should display message saying app works', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('app works!');
	});
});
