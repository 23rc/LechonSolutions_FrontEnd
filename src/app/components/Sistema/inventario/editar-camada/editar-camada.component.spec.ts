import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCamadaComponent } from './editar-camada.component';

describe('EditarCamadaComponent', () => {
  let component: EditarCamadaComponent;
  let fixture: ComponentFixture<EditarCamadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCamadaComponent]
    });
    fixture = TestBed.createComponent(EditarCamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
