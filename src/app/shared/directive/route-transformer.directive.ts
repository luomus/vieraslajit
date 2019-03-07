import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

// modified from https://stackoverflow.com/a/49006667

@Directive({
  selector: '[routeTransformer]'
})
export class RouteTransformerDirective {

  constructor(private el: ElementRef, private router: Router) { }

  @HostListener('click', ['$event'])
  public onClick(event) {
    console.log(event);
    console.log(event.target.getAttribute('href'));
    if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('/')) {
      this.router.navigate([event.target.getAttribute('href')]);
      event.preventDefault();
    } else {
      return;
    }
  }

};