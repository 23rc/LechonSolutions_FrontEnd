import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-eliminar-parto',
  templateUrl: './eliminar-parto.component.html',
  styleUrls: ['./eliminar-parto.component.css']
})
export class EliminarPartoComponent {
  constructor(public activeModal: NgbActiveModal) { }

  aceptar() {
    this.activeModal.close('Aceptar');
  }


  cancelar() {
    this.activeModal.close('Cancelar');
  }
}
