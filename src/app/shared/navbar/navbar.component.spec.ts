import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './navbar.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { SearchComponent } from '../googlesearch/search/search.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent, LanguageSelectorComponent, SearchComponent],
      imports: [TranslateModule.forRoot(), ModalModule.forRoot(), RouterTestingModule],
      providers: [TranslateService, BsModalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
