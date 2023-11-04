import { Component, Output, EventEmitter } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {

  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos

  contenedorDB: any = {
    nit:'',
    nombre: '',
    telefono: '',
    correo: '',
    direccion: ''
  };

  constructor(
    private toastr: ToastrService,
    private clienteService: ClienteService, public activeModal: NgbActiveModal) {}

  insertar() {
  

    if (
      !this.contenedorDB.nit || 
      !this.contenedorDB.nombre || 
      !this.contenedorDB.telefono || 
      !this.contenedorDB.correo || 
      !this.contenedorDB.direccion) {
      this.toastr.warning('Por favor, completa todos los campos', 'Advertencia',this.toastrConfigTime);

      return;
    }

    this.clienteService.insert(this.contenedorDB).subscribe(
      () => {
        this.toastr.success('Cliente insertado con éxito', 'Correcto!!',this.toastrConfigTime);

        setTimeout(() => {
          this.activeModal.close('Cliente insertado con éxito');
        }, 2000);
      },
      (error) => {
   this.toastr.error('Error al insertar el cliente', 'Incorrecto!!',this.toastrConfigTime);

        console.error('Error al insertar el cliente', error);
      }
    );
  }

 

  cancelar() {
    this.activeModal.dismiss('cancelar');
  }
}


