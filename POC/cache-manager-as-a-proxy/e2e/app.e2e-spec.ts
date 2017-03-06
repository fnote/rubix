import { CacheImplPage } from './app.po';

describe('cache-impl App', function() {
  let page: CacheImplPage;

  beforeEach(() => {
    page = new CacheImplPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
