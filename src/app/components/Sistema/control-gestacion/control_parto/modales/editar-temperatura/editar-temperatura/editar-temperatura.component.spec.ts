import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTemperaturaComponent } from './editar-temperatura.component';

describe('EditarTemperaturaComponent', () => {
  let component: EditarTemperaturaComponent;
  let fixture: ComponentFixture<EditarTemperaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarTemperaturaComponent]
    });
    fixture = TestBed.createComponent(EditarTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
