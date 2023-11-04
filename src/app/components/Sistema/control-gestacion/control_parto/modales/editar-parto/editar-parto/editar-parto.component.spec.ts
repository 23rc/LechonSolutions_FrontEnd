import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPartoComponent } from './editar-parto.component';

describe('EditarPartoComponent', () => {
  let component: EditarPartoComponent;
  let fixture: ComponentFixture<EditarPartoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPartoComponent]
    });
    fixture = TestBed.createComponent(EditarPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
