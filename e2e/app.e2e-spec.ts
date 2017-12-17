import { ArticleWebPage } from './app.po';

describe('article-web App', () => {
  let page: ArticleWebPage;

  beforeEach(() => {
    page = new ArticleWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
