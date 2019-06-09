import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoordinatorPage } from './add-coordinator.page';

describe('AddCoordinatorPage', () => {
  let component: AddCoordinatorPage;
  let fixture: ComponentFixture<AddCoordinatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoordinatorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoordinatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
