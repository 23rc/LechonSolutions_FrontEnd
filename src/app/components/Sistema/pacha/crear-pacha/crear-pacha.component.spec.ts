import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPachaComponent } from './crear-pacha.component';

describe('CrearPachaComponent', () => {
  let component: CrearPachaComponent;
  let fixture: ComponentFixture<CrearPachaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearPachaComponent]
    });
    fixture = TestBed.createComponent(CrearPachaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
