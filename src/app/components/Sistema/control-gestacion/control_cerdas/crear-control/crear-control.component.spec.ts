import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearControlComponent } from './crear-control.component';

describe('CrearControlComponent', () => {
  let component: CrearControlComponent;
  let fixture: ComponentFixture<CrearControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearControlComponent]
    });
    fixture = TestBed.createComponent(CrearControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
