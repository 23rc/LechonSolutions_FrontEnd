import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCerdaComponent } from './listado-cerda.component';

describe('ListadoCerdaComponent', () => {
  let component: ListadoCerdaComponent;
  let fixture: ComponentFixture<ListadoCerdaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoCerdaComponent]
    });
    fixture = TestBed.createComponent(ListadoCerdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
