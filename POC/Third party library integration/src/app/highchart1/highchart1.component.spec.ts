/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Highchart1Component } from './highchart1.component';

describe('Highchart1Component', () => {
  let component: Highchart1Component;
  let fixture: ComponentFixture<Highchart1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Highchart1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Highchart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
