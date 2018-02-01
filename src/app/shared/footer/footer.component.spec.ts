import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { DebugElement } from '@angular/core/src/debug/debug_node';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let de : DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain list', () => {
    expect(de.nativeElement.querySelectorAll('ul li').length).toBe(2);
  });
  it('should have correct links', () => {
    expect(de.nativeElement.querySelectorAll('ul li')[0].querySelector('a').href).toBe('http://luomus.fi/');
    expect(de.nativeElement.querySelectorAll('ul li')[1].querySelector('a').href).toBe('http://www.luke.fi/');
  });
});
