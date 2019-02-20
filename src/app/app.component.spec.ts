import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './shared/shared.module';
import { TaxonService } from './shared/service/taxon.service';
import { ApiService } from './shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, AccordionModule } from 'ngx-bootstrap';
import { InformationService } from './shared/service/information.service';
import { UserService } from './shared/service/user.service';
import { StateService } from './state.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BsDropdownModule.forRoot(),
        AccordionModule.forRoot()
      ],
      providers:[ ApiService, TaxonService, InformationService, UserService, StateService ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Vieraslajit'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('vrs');
  }));
});
