import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportescomprasComponent } from './reportescompras.component';

describe('ReportescomprasComponent', () => {
  let component: ReportescomprasComponent;
  let fixture: ComponentFixture<ReportescomprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportescomprasComponent]
    });
    fixture = TestBed.createComponent(ReportescomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
