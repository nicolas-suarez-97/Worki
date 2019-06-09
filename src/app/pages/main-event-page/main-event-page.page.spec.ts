import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEventPagePage } from './main-event-page.page';

describe('MainEventPagePage', () => {
  let component: MainEventPagePage;
  let fixture: ComponentFixture<MainEventPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEventPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEventPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
