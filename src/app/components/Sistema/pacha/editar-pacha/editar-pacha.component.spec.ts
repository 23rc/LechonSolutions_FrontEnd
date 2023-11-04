import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPachaComponent } from './editar-pacha.component';

describe('EditarPachaComponent', () => {
  let component: EditarPachaComponent;
  let fixture: ComponentFixture<EditarPachaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPachaComponent]
    });
    fixture = TestBed.createComponent(EditarPachaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
