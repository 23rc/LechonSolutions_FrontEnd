import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPartoComponent } from './info-parto.component';

describe('InfoPartoComponent', () => {
  let component: InfoPartoComponent;
  let fixture: ComponentFixture<InfoPartoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPartoComponent]
    });
    fixture = TestBed.createComponent(InfoPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
