import { AppPage } from './app.po';

describe('juicydata App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Resources and tools to help you to be prepared for your next FTC competition');
  });
});
