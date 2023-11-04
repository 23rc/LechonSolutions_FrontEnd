import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPartoComponent } from './eliminar-parto.component';

describe('EliminarPartoComponent', () => {
  let component: EliminarPartoComponent;
  let fixture: ComponentFixture<EliminarPartoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarPartoComponent]
    });
    fixture = TestBed.createComponent(EliminarPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
