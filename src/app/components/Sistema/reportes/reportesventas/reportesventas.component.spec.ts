import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesventasComponent } from './reportesventas.component';

describe('ReportesventasComponent', () => {
  let component: ReportesventasComponent;
  let fixture: ComponentFixture<ReportesventasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesventasComponent]
    });
    fixture = TestBed.createComponent(ReportesventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
