import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {
  constructor() { }

  public static getLanguage() {
    return window.localStorage.getItem("vrs-lang");
  }

  public static setLanguage(language: string) {
    window.localStorage.setItem("vrs-lang", language);
  }
}
