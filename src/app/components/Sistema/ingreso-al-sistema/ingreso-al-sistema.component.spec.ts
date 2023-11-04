import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoAlSistemaComponent } from './ingreso-al-sistema.component';

describe('IngresoAlSistemaComponent', () => {
  let component: IngresoAlSistemaComponent;
  let fixture: ComponentFixture<IngresoAlSistemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresoAlSistemaComponent]
    });
    fixture = TestBed.createComponent(IngresoAlSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
