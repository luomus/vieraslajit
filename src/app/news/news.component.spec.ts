import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination'

import { ApiService } from '../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../shared/service/news.service';
import { NewsComponent } from './news.component';
import { TranslateModule } from '@ngx-translate/core';
import { EditcmsModule } from '../shared-modules/editcms/editcms.module';
import { SpinnerModule } from '../shared-modules/spinner/spinner.module';
import { NewsHeaderComponent } from './news-header/news-header.component';
import { SharedModule } from '../shared/shared.module';
import { NewsParamsService } from './news-params.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsComponent, NewsHeaderComponent],
      imports: [RouterTestingModule, HttpClientModule, TranslateModule.forRoot(),EditcmsModule, NgxPaginationModule,
                SpinnerModule, SharedModule],
      providers: [ApiService, NewsService, NewsParamsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
