import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoBarracoComponent } from './listado-barraco.component';

describe('ListadoBarracoComponent', () => {
  let component: ListadoBarracoComponent;
  let fixture: ComponentFixture<ListadoBarracoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoBarracoComponent]
    });
    fixture = TestBed.createComponent(ListadoBarracoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
