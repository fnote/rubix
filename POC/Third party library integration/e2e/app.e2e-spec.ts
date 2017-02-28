import { QuickStartCliPage } from './app.po';

describe('quick-start-cli App', function() {
  let page: QuickStartCliPage;

  beforeEach(() => {
    page = new QuickStartCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
