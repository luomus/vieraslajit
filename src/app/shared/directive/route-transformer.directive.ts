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
    event.preventDefault();
    const href: string = this.getHref(event.target);
    if (href) {
      const linkMatch = href.match(this.internalLinkRegex);
      if (href.startsWith('/')) {
        this.router.navigate([href]);
        event.preventDefault();
      } else if (href.startsWith('#')) {
        this.router.navigate([], { fragment: href.substring(1) });
        event.preventDefault();
      } else if (linkMatch) {
        this.router.navigate([linkMatch[2]]);
        event.preventDefault();
      }
    } else {
      return;
    }
  }

  private getHref(target: any): string {
    if (target instanceof HTMLElement) {
      if (target.tagName === 'A') {
        return target.getAttribute('href');
      } else if (target.parentElement) {
        return this.getHref(target.parentElement);
      }
    }
    return '';
  }

};