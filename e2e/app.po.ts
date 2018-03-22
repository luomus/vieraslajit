import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('vrs-root h1')).getText();
  }

  navigateToLegal() {
    return browser.get('/legal');
  }
}
