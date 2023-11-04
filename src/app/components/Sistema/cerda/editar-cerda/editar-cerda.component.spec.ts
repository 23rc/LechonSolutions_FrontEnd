import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCerdaComponent } from './editar-cerda.component';

describe('EditarCerdaComponent', () => {
  let component: EditarCerdaComponent;
  let fixture: ComponentFixture<EditarCerdaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCerdaComponent]
    });
    fixture = TestBed.createComponent(EditarCerdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
