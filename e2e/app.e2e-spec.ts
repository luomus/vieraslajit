import { AppPage } from './app.po';

describe('vieraslajit App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('VIERASLAJIT.FI');
  });

  it('should display legal title when navigated to legal', () => {
    page.navigateToLegal();
    expect(page.getParagraphText()).toEqual('Lainsäädäntö');
  });
});
