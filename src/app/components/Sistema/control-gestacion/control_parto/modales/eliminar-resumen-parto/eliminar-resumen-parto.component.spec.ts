import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarResumenPartoComponent } from './eliminar-resumen-parto.component';

describe('EliminarResumenPartoComponent', () => {
  let component: EliminarResumenPartoComponent;
  let fixture: ComponentFixture<EliminarResumenPartoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarResumenPartoComponent]
    });
    fixture = TestBed.createComponent(EliminarResumenPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
