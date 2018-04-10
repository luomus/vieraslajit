import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiService } from '../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../shared/service/news.service';
import { NewsComponent } from './news.component';
import { TranslateModule } from '@ngx-translate/core';
import { EditcmsModule } from '../shared-modules/editcms/editcms.module';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsComponent],
      imports: [HttpClientModule, TranslateModule.forRoot(),EditcmsModule],
      providers: [ApiService, NewsService]
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
