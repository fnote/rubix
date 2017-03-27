import { RubixPage } from './app.po';

/* tslint:disable */
describe('rubix App', function() {
/* tslint:enable */
	let page: RubixPage;

	beforeEach(() => {
		page = new RubixPage();
	});

	it('should display message saying app works', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('app works!');
	});
});
