import { Component, Output, EventEmitter } from '@angular/core';
import { PachaService } from 'src/app/services/pacha.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-pacha',
  templateUrl: './crear-pacha.component.html',
  styleUrls: ['./crear-pacha.component.css']
})
export class CrearPachaComponent {
  showSuccessAlert = false;
  showErrorAlert = false;
  showValidationAlert = false;
  validationMessage = '';
  successMessage = '';
  errorMessage = '';
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos

  contenedorDB: any = {
    nombre: '',
    usuario: '',
    rol: '',
    pass: ''
  };

  constructor(
    private toastr: ToastrService,
    private pachaService: PachaService, public activeModal: NgbActiveModal) {}

  insertar() {
    this.resetValidationAlert();
    this.closeSuccessAlert();
    this.closeErrorAlert();

    if (!this.contenedorDB.nombre || 
      !this.contenedorDB.fechaIngreso || 
      !this.contenedorDB.fechaVencimiento || 
      !this.contenedorDB.observacion) {
      this.showValidationAlert = true;
      this.toastr.warning('Por favor, completa todos los campos', 'Advertencia',this.toastrConfigTime);

      return;
    }

    this.pachaService.insert(this.contenedorDB).subscribe(
      () => {
        this.toastr.success('Pacha insertado con éxito', 'Correcto!!',this.toastrConfigTime);
        setTimeout(() => {
          this.activeModal.close('pacha insertado con éxito');
        }, 2000);
      },
      (error) => {
        this.toastr.error('Error al insertar la pacha', 'Incorrecto!!',this.toastrConfigTime);

        console.error('Error al insertar el pacha', error);
      }
    );
  }

  closeValidationAlert() {
    this.showValidationAlert = false;
  }

  closeSuccessAlert() {
    this.showSuccessAlert = false;
    this.successMessage = '';
  }

  closeErrorAlert() {
    this.showErrorAlert = false;
    this.errorMessage = '';
  }

  resetValidationAlert() {
    this.showValidationAlert = false;
    this.validationMessage = '';
  }

  cancelar() {
    this.activeModal.dismiss('cancelar');
  }
}
