import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vrs-taxon',
  templateUrl: './taxon.component.html',
  styleUrls: ['./taxon.component.scss']
})
export class TaxonComponent implements OnInit {

  taxon = [
    { name: "ruokosammakko" },
    { name: "espanjansiruetana" },
    { name: "jalohaukka" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
