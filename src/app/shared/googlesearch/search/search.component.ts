import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'vrs-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(

    private sanitizer: DomSanitizer,
  ) { }
  gcsesearch: SafeHtml;

  ngOnInit() {
    this.gcsesearch = this.sanitizer.bypassSecurityTrustHtml("<gcse:search></gcse:search>");
    var cx = '012427346317921450655:zacgnrqdi0q';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }

}
