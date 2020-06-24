import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

/**
 * Hack for reloading components. Redirects back to the path given as parameter
 */

@Component({
  selector: 'vrs-reload',
  template: ''
})
export class RedirectComponent implements OnInit {
  
  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.router.navigate(
        [url.join('/')],
        {
          queryParams: this.route.snapshot.queryParams
        }
      )
    })
  }
}
