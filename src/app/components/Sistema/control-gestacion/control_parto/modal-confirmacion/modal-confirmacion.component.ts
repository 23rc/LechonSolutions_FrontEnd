import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent {
  numParto: string = '';
  showNuevoButton: boolean = true;
  ultimoParto?: number; // Declaramos como opcional

  constructor(public activeModal: NgbActiveModal) {}

  submitForm() {
    this.activeModal.close(this.numParto);
  }

  closeForm() {
    this.activeModal.dismiss();
  }

// Función para el botón "Nuevo"
nuevoParto() {
  if (this.showNuevoButton) {
    if (this.ultimoParto !== undefined) {
      this.numParto = (this.ultimoParto + 1).toString();
    } else {
      // Si el último parto no se ha cargado, asigna un valor predeterminado
      this.numParto = '1'; // Cambia '1' al valor que desees usar por defecto
    }
  }
}


}
