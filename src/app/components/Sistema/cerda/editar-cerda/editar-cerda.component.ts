import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CerdaService } from 'src/app/services/cerda.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editar-cerda',
  templateUrl: './editar-cerda.component.html',
  styleUrls: ['./editar-cerda.component.css']
})
export class EditarCerdaComponent {
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  usuario: any = {};
  isLoading: boolean = true;
  exito: boolean = false;
  constructor(
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private cerdaService: CerdaService,
  ) {}
  ngOnInit(): void {
     }
  guardarCambios() {
    // Utiliza el servicio usuarioService para enviar los cambios al servidor
    this.cerdaService.editar(this.usuario.id, this.usuario).subscribe(
      (response) => {
            console.log('Usuario actualizado exitosamente:', response);
        this.exito = true;
        this.toastr.success('Cerda actualizado con éxito', 'Correcto!!',this.toastrConfigTime);
             setTimeout(() => {
          this.activeModal.close('Guardado con éxito');
        }, 2000);
      },
      (error) => {
          this.toastr.error('Error al actualizar la cerda', 'Incorrecto!!',this.toastrConfigTime);
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
    cancelar() {
    this.activeModal.dismiss('Cancelado');
  }
}
