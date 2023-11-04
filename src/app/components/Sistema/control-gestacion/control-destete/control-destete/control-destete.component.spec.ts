import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDesteteComponent } from './control-destete.component';

describe('ControlDesteteComponent', () => {
  let component: ControlDesteteComponent;
  let fixture: ComponentFixture<ControlDesteteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlDesteteComponent]
    });
    fixture = TestBed.createComponent(ControlDesteteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
