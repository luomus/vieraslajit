import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalComponent } from './legal.component';
import { TranslateModule } from '@ngx-translate/core';
import { TabsModule } from 'ngx-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LegalComponent', () => {
  let component: LegalComponent;
  let fixture: ComponentFixture<LegalComponent>;
  let h1: HTMLElement;
  let tabs: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LegalComponent],
      imports: [TranslateModule.forRoot(), TabsModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('legal.h1');
  });

  it('should display all tabs', () => {
    tabs = fixture.debugElement.queryAll(By.css('tab'));
    expect(tabs.length).toBe(5);
  });

  it('should display correct titles for each tab', () => {
    tabs = fixture.debugElement.queryAll(By.css('tab'));
    tabs.forEach((tab, index) => {
      expect(tab.nativeElement.textContent).toContain('legal.h' + (index + 1));
    });
  });
});
