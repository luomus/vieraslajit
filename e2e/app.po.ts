import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('vrs-root h1')).getText();
  }

  getText(){
    return element(by.css('vrs-root p')).getText();
  }

  navigateToLegal() {
    return browser.get('/legal');
  }

  navigateToForm() {
    return browser.get('/form/MHL.9');
  }
}
