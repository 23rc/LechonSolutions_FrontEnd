import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-eliminar-temperatura',
  templateUrl: './eliminar-temperatura.component.html',
  styleUrls: ['./eliminar-temperatura.component.css']
})
export class EliminarTemperaturaComponent {



  constructor(public activeModal: NgbActiveModal) { }

  aceptar() {
    this.activeModal.close('Aceptar');
  }


  cancelar() {
    this.activeModal.close('Cancelar');
  }
}
