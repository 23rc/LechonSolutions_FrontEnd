import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearControlPartoComponent } from './crear-control-parto.component';

describe('CrearControlPartoComponent', () => {
  let component: CrearControlPartoComponent;
  let fixture: ComponentFixture<CrearControlPartoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearControlPartoComponent]
    });
    fixture = TestBed.createComponent(CrearControlPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
