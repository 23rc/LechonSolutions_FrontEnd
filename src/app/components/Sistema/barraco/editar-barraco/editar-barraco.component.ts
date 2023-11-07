import { Component,OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarracoService } from 'src/app/services/barraco.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-editar-barraco',
  templateUrl: './editar-barraco.component.html',
  styleUrls: ['./editar-barraco.component.css']
})
export class EditarBarracoComponent {
  showChart: boolean = true;
  usuario: any = {};
  isLoading: boolean = true;
  exito: boolean = false;
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  constructor(
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private barracoService: BarracoService,
  ) {}
  ngOnInit(): void {
     }
  guardarCambios() {
    // Utiliza el servicio usuarioService para enviar los cambios al servidor
    this.barracoService.editar(this.usuario.id, this.usuario).subscribe(
      (response) => {
           console.log('Usuario actualizado exitosamente:', response);
         this.exito = true;
        this.toastr.success('Barraco actualizado con éxito', 'Correcto!!',this.toastrConfigTime);
            setTimeout(() => {
                  this.activeModal.close('Guardado con éxito');
        }, 2000);
      },
      (error) => {
        // Manejar errores en caso de que la actualización falle
        this.toastr.error('Error al actualizar el barraco', 'Incorrecto!!',this.toastrConfigTime);
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
  cancelar() {
    // Cierra el modal sin guardar cambios
    this.activeModal.dismiss('Cancelado');
  }
}
