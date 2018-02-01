import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vrs-taxon-list',
  templateUrl: './taxon-list.component.html',
  styleUrls: ['./taxon-list.component.scss']
})
export class TaxonListComponent implements OnInit {

  taxon = [
    { name: "ruokosammakko" },
    { name: "espanjansiruetana" },
    { name: "jalohaukka" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
