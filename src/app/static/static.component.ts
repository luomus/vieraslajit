import { Component, OnInit } from '@angular/core';
import { InformationService } from '../shared/service/information.service';
import { Information } from '../shared/model/Information';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'vrs-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
})
export class StaticComponent implements OnInit {

  public scontent: Object;
  id: String;

  constructor(public informationService: InformationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.getInformation("i-"+ this.id);
    // update scontent   
  }

  getInformation(id) {
    this.informationService.getInformation(id).subscribe((data) => {
        this.scontent = data;
    });
  }
}
