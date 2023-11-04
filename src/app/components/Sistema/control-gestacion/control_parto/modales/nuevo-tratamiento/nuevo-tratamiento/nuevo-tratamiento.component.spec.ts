import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTratamientoComponent } from './nuevo-tratamiento.component';

describe('NuevoTratamientoComponent', () => {
  let component: NuevoTratamientoComponent;
  let fixture: ComponentFixture<NuevoTratamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoTratamientoComponent]
    });
    fixture = TestBed.createComponent(NuevoTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
