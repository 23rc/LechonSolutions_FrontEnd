import { Component, Output, EventEmitter } from '@angular/core';
import { BarracoService } from 'src/app/services/barraco.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-barraco',
  templateUrl: './crear-barraco.component.html',
  styleUrls: ['./crear-barraco.component.css']
})
export class CrearBarracoComponent {
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos

  contenedorDB: any = {
    nombre: '',
    usuario: '',
    rol: '',
    pass: ''
  };

  constructor(
    private toastr: ToastrService,
    private barracoService: BarracoService, public activeModal: NgbActiveModal) {}

  insertar() {
  

    if (!this.contenedorDB.nombre || 
      !this.contenedorDB.peso || 
      !this.contenedorDB.fechaIngreso || 
      !this.contenedorDB.observacion) {

      this.toastr.warning('Por favor, completa todos los campos', 'Advertencia',this.toastrConfigTime);

      return;
    }

    this.barracoService.insert(this.contenedorDB).subscribe(
      () => {

        this.toastr.success('Barraco insertado con éxito', 'Correcto!!',this.toastrConfigTime);
      
        setTimeout(() => {
          this.activeModal.close('');
        }, 2000);
      },
      (error) => {
        this.toastr.error('Error al insertar el barraco', 'Incorrecto!!',this.toastrConfigTime);


        console.error('Error al insertar el barraco', error);
      }
    );
  }


  cancelar() {
    this.activeModal.dismiss('cancelar');
  }
}
