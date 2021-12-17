import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

/**
 * Hack for reloading components. Redirects back to the path given as parameter
 */

@Component({
  selector: 'vrs-reload',
  template: '<p>You should not see this if everything went correctly.</p>'
})
export class ReloadComponent implements OnInit {
  
  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const path = this.location.path().split('?')[0]
    this.router.navigate(
      [path],
      {queryParams: this.route.snapshot.queryParams, skipLocationChange: true});
  }
}
