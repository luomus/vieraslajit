import { Component, OnInit, OnDestroy } from '@angular/core';
import { InformationService } from '../shared/service/information.service';
import { Information } from '../shared/model/Information';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'vrs-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
})
export class StaticComponent implements OnInit {

  public scontent: Object;
  id: String;
  sub: Subscription;

  constructor(public informationService: InformationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadContent();
    this.sub = this.router.events.filter(e => e instanceof NavigationEnd).subscribe((data)=>{
      this.loadContent();
    });
  }

  loadContent() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getInformation(this.id);
  }

  getInformation(id) {
    this.informationService.getInformation(id).subscribe((data) => {
        this.scontent = data;
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
