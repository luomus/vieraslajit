import { AppPage } from './app.po';

describe('vieraslajit App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Tervetuloa vieraslajiportaaliin!');
  });
});
