import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBarracoComponent } from './editar-barraco.component';

describe('EditarBarracoComponent', () => {
  let component: EditarBarracoComponent;
  let fixture: ComponentFixture<EditarBarracoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarBarracoComponent]
    });
    fixture = TestBed.createComponent(EditarBarracoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
