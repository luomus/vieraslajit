import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import{SharedModule} from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[SharedModule, TranslateModule.forRoot()],
      providers:[TranslateService]
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
