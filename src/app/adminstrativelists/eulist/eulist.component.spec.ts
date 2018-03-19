import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EulistComponent } from './eulist.component';
import { RouterTestingModule } from '@angular/router/testing';

import { ListService } from '../../shared/service/list.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


describe('EulistComponent', () => {
  let component: EulistComponent;
  let fixture: ComponentFixture<EulistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EulistComponent ],
      imports: [RouterTestingModule, HttpClientModule, TranslateModule.forRoot(),NgxDatatableModule],
      providers: [ListService, ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EulistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
