import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProveedoresComponent } from './editar-proveedores.component';

describe('EditarProveedoresComponent', () => {
  let component: EditarProveedoresComponent;
  let fixture: ComponentFixture<EditarProveedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarProveedoresComponent]
    });
    fixture = TestBed.createComponent(EditarProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
