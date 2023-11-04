import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartoService } from 'src/app/services/parto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-editar-parto',
  templateUrl: './editar-parto.component.html',
  styleUrls: ['./editar-parto.component.css']
})
export class EditarPartoComponent {
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  usuario: any = {};
  isLoading: boolean = true;
  exito: boolean = false;
  constructor(
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private partoService: PartoService,
  ) {}

  ngOnInit(): void {
   
  }
  guardarCambios() {
    // Utiliza el servicio usuarioService para enviar los cambios al servidor
    this.partoService.editar(this.usuario.id, this.usuario).subscribe(
      (response) => {
        // Manejar la respuesta exitosa del servidor, si es necesario
        console.log('Parto actualizado exitosamente:', response);

        // Muestra el mensaje de éxito y cierra el modal
        this.exito = true;
        this.toastr.success('Parto actualizado con éxito', 'Correcto!!',this.toastrConfigTime);
        // Cierra el modal después de 2 segundos (puedes ajustar el tiempo)
        setTimeout(() => {
          // Llama a refreshUserList para actualizar la lista de usuarios en el componente de lista
          this.activeModal.close('Guardado con éxito');
        }, 2000);
      },
      (error) => {
        this.toastr.error('Error al actualizar el parto', 'Incorrecto!!',this.toastrConfigTime);
        // Manejar errores en caso de que la actualización falle
        console.error('Error al actualizar el parto:', error);
      }
    );
  }
  
  cancelar() {
    // Cierra el modal sin guardar cambios
    this.activeModal.close();
  }
}
