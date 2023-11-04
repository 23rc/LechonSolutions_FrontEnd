import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTemperaturaComponent } from './eliminar-temperatura.component';

describe('EliminarTemperaturaComponent', () => {
  let component: EliminarTemperaturaComponent;
  let fixture: ComponentFixture<EliminarTemperaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarTemperaturaComponent]
    });
    fixture = TestBed.createComponent(EliminarTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
