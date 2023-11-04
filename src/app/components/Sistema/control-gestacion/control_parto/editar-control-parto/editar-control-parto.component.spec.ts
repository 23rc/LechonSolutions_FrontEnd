import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarControlPartoComponent } from './editar-control-parto.component';

describe('EditarControlPartoComponent', () => {
  let component: EditarControlPartoComponent;
  let fixture: ComponentFixture<EditarControlPartoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarControlPartoComponent]
    });
    fixture = TestBed.createComponent(EditarControlPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
