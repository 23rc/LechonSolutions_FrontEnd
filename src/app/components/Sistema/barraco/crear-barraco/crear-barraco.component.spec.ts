import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBarracoComponent } from './crear-barraco.component';

describe('CrearBarracoComponent', () => {
  let component: CrearBarracoComponent;
  let fixture: ComponentFixture<CrearBarracoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearBarracoComponent]
    });
    fixture = TestBed.createComponent(CrearBarracoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
