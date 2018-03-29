import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationService } from '../shared/service/information.service';
import { StaticComponent } from './static.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../shared/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('StaticComponent', () => {
  let component: StaticComponent;
  let fixture: ComponentFixture<StaticComponent>;
   
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ StaticComponent ],
      providers: [InformationService, ApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
