import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPartoComponent } from './control-parto.component';

describe('ControlPartoComponent', () => {
  let component: ControlPartoComponent;
  let fixture: ComponentFixture<ControlPartoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPartoComponent]
    });
    fixture = TestBed.createComponent(ControlPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
