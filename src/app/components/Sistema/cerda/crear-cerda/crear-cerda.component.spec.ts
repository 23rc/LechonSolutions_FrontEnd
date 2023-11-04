import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCerdaComponent } from './crear-cerda.component';

describe('CrearCerdaComponent', () => {
  let component: CrearCerdaComponent;
  let fixture: ComponentFixture<CrearCerdaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearCerdaComponent]
    });
    fixture = TestBed.createComponent(CrearCerdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
