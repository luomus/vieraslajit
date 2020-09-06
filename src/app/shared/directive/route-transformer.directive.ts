import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

// modified from https://stackoverflow.com/a/49006667

@Directive({
  selector: '[routeTransformer]'
})
export class RouteTransformerDirective {

  private internalLinkRegex = /.*(vieraslajit-dev.laji.fi|vieraslajit.fi|localhost:?\d+)(.*)/;

  constructor(private el: ElementRef, private router: Router) { }

  @HostListener('click', ['$event'])
  public onClick(event) {
    if (event.target.tagName === 'A') {
      const fullLink: string = event.target.getAttribute('href');
      const linkMatch = fullLink.match(this.internalLinkRegex);
      if (linkMatch) {
        this.router.navigate([linkMatch[2]]);
        event.preventDefault();
      } else if (fullLink.startsWith('/')) {
        this.router.navigate([fullLink]);
        event.preventDefault();
      } else if (fullLink.startsWith('#')) {
        this.router.navigate([], { fragment: fullLink.substring(1) });
        event.preventDefault();
      }
    } else {
      return;
    }
  }

};