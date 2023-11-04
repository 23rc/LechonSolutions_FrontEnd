import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPachaComponent } from './listado-pacha.component';

describe('ListadoPachaComponent', () => {
  let component: ListadoPachaComponent;
  let fixture: ComponentFixture<ListadoPachaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoPachaComponent]
    });
    fixture = TestBed.createComponent(ListadoPachaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
