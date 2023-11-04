import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-eliminar-tratamiento',
  templateUrl: './eliminar-tratamiento.component.html',
  styleUrls: ['./eliminar-tratamiento.component.css']
})
export class EliminarTratamientoComponent {
  constructor(public activeModal: NgbActiveModal) { }

  aceptar() {
    this.activeModal.close('Aceptar');
  }


  cancelar() {
    this.activeModal.close('Cancelar');
  }
}
