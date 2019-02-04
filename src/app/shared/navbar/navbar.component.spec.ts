import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './navbar.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { SearchComponent } from '../googlesearch/search/search.component';
import { BsModalService, ModalModule, CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { InformationService } from '../service/information.service';
import { UserService } from '../service/user.service';
import { ApiService } from '../api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared.module';
import { TaxonService } from '../service/taxon.service';
import { GoogleSearchApiService } from '../api/google-search.api.service';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [TranslateModule.forRoot(), ModalModule.forRoot(), CollapseModule.forRoot(), RouterTestingModule, HttpClientModule, SharedModule, BsDropdownModule.forRoot()],
      providers: [TranslateService, BsModalService, InformationService, ApiService, UserService, TaxonService, GoogleSearchApiService]
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
