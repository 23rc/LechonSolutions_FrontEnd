import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaPartosComponent } from './fecha-partos.component';

describe('FechaPartosComponent', () => {
  let component: FechaPartosComponent;
  let fixture: ComponentFixture<FechaPartosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FechaPartosComponent]
    });
    fixture = TestBed.createComponent(FechaPartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
