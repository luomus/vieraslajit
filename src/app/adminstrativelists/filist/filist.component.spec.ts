import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilistComponent } from './filist.component';
import { RouterTestingModule } from '@angular/router/testing';

import { ListService } from '../../shared/service/list.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('FilistComponent', () => {
  let component: FilistComponent;
  let fixture: ComponentFixture<FilistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilistComponent ],
      imports: [RouterTestingModule, HttpClientModule, TranslateModule.forRoot(),NgxDatatableModule],
      providers: [ListService, ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
