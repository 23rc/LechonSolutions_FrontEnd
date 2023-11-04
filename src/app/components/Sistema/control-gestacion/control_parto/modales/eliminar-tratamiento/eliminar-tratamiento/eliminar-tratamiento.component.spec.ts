import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTratamientoComponent } from './eliminar-tratamiento.component';

describe('EliminarTratamientoComponent', () => {
  let component: EliminarTratamientoComponent;
  let fixture: ComponentFixture<EliminarTratamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarTratamientoComponent]
    });
    fixture = TestBed.createComponent(EliminarTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
