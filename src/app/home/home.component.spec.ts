import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import{SharedModule} from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { NewsService } from '../shared/service/news.service';
import { ApiService } from '../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[SharedModule, HttpClientModule],
      providers:[NewsService, ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
