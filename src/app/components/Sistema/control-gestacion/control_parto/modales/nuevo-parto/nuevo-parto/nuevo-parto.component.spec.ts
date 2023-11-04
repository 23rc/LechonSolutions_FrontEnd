import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPartoComponent } from './nuevo-parto.component';

describe('NuevoPartoComponent', () => {
  let component: NuevoPartoComponent;
  let fixture: ComponentFixture<NuevoPartoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoPartoComponent]
    });
    fixture = TestBed.createComponent(NuevoPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
