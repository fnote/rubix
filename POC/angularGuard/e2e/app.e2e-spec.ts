import { RubixPage } from './app.po';

describe('rubix App', function() {
  let page: RubixPage;

  beforeEach(() => {
    page = new RubixPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
