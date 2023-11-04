import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCerdaComponent } from './control-cerda.component';

describe('ControlCerdaComponent', () => {
  let component: ControlCerdaComponent;
  let fixture: ComponentFixture<ControlCerdaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlCerdaComponent]
    });
    fixture = TestBed.createComponent(ControlCerdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
