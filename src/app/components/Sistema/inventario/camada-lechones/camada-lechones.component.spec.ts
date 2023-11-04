import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamadaLechonesComponent } from './camada-lechones.component';

describe('CamadaLechonesComponent', () => {
  let component: CamadaLechonesComponent;
  let fixture: ComponentFixture<CamadaLechonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamadaLechonesComponent]
    });
    fixture = TestBed.createComponent(CamadaLechonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
