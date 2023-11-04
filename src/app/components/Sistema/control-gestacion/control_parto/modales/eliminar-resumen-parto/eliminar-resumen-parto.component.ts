import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-eliminar-resumen-parto',
  templateUrl: './eliminar-resumen-parto.component.html',
  styleUrls: ['./eliminar-resumen-parto.component.css']
})
export class EliminarResumenPartoComponent {


  constructor(public activeModal: NgbActiveModal) { }

  aceptar() {
    this.activeModal.close('Aceptar');
  }


  cancelar() {
    this.activeModal.close('Cancelar');
  }
}
