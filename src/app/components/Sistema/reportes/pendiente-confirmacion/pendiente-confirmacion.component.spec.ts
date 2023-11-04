import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendienteConfirmacionComponent } from './pendiente-confirmacion.component';

describe('PendienteConfirmacionComponent', () => {
  let component: PendienteConfirmacionComponent;
  let fixture: ComponentFixture<PendienteConfirmacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendienteConfirmacionComponent]
    });
    fixture = TestBed.createComponent(PendienteConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
