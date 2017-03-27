import { browser, by, element } from 'protractor';

export class RubixPage {
	/* tslint:disable */
	navigateTo() {
		return browser.get('/');
	}

	getParagraphText() {
		return element(by.css('app-root h1')).getText();
	}
	/* tslint:enable */
}
