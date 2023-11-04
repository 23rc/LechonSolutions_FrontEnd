import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTratamientoComponent } from './editar-tratamiento.component';

describe('EditarTratamientoComponent', () => {
  let component: EditarTratamientoComponent;
  let fixture: ComponentFixture<EditarTratamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarTratamientoComponent]
    });
    fixture = TestBed.createComponent(EditarTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
