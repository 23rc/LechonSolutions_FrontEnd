import { Component, Output, EventEmitter } from '@angular/core';
import { CerdaService } from 'src/app/services/cerda.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-cerda',
  templateUrl: './crear-cerda.component.html',
  styleUrls: ['./crear-cerda.component.css']
})
export class CrearCerdaComponent {

 
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos

  contenedorDB: any = {
    nombre: '',
    usuario: '',
    rol: '',
    pass: ''
  };

  constructor(
    private toastr: ToastrService,
    private cerdaService: CerdaService, public activeModal: NgbActiveModal) {}

  insertar() {
  

    if (!this.contenedorDB.nombre || 
      !this.contenedorDB.peso || 
      !this.contenedorDB.fechaIngreso || 
      !this.contenedorDB.observacion) {
      this.toastr.warning('Por favor, completa todos los campos', 'Advertencia',this.toastrConfigTime);

      return;
    }

    this.cerdaService.insert(this.contenedorDB).subscribe(
      () => {
        this.toastr.success('Cerda insertado con éxito', 'Correcto!!',this.toastrConfigTime);

        setTimeout(() => {
          this.activeModal.close('cerda insertado con éxito');
        }, 2000);
      },
      (error) => {
   this.toastr.error('Error al insertar la cerda', 'Incorrecto!!',this.toastrConfigTime);

        console.error('Error al insertar el cerda', error);
      }
    );
  }

 

  cancelar() {
    this.activeModal.dismiss('cancelar');
  }
}
