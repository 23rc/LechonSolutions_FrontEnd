import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaTemperaturaComponent } from './nueva-temperatura.component';

describe('NuevaTemperaturaComponent', () => {
  let component: NuevaTemperaturaComponent;
  let fixture: ComponentFixture<NuevaTemperaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaTemperaturaComponent]
    });
    fixture = TestBed.createComponent(NuevaTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
