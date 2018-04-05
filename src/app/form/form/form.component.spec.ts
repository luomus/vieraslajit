import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormService } from '../../shared/service/form.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormApiClient } from '../../shared/api/FormApiClient';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../shared/service/user.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpModule, RouterTestingModule, TranslateModule.forRoot()],
      declarations: [FormComponent],
      providers: [FormService, ApiService, FormApiClient, TranslateService, UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tell user to login if not already logged in', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent).toContain('form.login');
  });
});
