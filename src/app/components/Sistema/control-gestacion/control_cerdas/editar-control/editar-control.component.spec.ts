import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarControlComponent } from './editar-control.component';

describe('EditarControlComponent', () => {
  let component: EditarControlComponent;
  let fixture: ComponentFixture<EditarControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarControlComponent]
    });
    fixture = TestBed.createComponent(EditarControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
