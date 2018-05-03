import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Hack for reloading components. Redirects back to :path
 */

@Component({
  selector: 'vrs-reload',
  template: '<p>You should not see this if everything went correctly.</p>'
})
export class ReloadComponent implements OnInit {
  
  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    let re: string = "";
    for (const c of this.route.url["_value"]) {
      re += ("/" + c.path);
    }
    this.router.navigate([re]);
  }
}
