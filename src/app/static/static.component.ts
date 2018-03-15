import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vrs-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnInit {

  private scontent = "";

  constructor() { }

  ngOnInit() {
    // get content from cms
    // update scontent
  }

}
