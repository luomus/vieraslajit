import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vrs-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnInit {

  scontent = "<p>toimii</p>";

  constructor() { }

  ngOnInit() {
    // get content from cms
    // update scontent
  }

}
