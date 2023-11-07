import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlPartoService } from 'src/app/services/controlParto.service';
import { ControlCerdaService } from 'src/app/services/controlCerda.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-control',
  templateUrl: './editar-control.component.html',
  styleUrls: ['./editar-control.component.css']
})
export class EditarControlComponent  implements OnInit{
  mostrarConfirmacion = false;

  cargaCargada: boolean = false;


  cerdasList: any[] = [];
  barracosList: any[] = [];
  pachasList: any[] = [];
  productosList: any[] = [];
  usuario: any = {
    id:null
  };
  isLoading: boolean = true;
  exito: boolean = false;
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private controlPartoService: ControlPartoService,
    private controlCerdaService: ControlCerdaService,
  ) {}

  ngOnInit() {
    // Llama a las rutas del backend para obtener datos de cerdas y barracos
    this.http.get('https://lechonsolutionsbackend-production.up.railway.app/controlcerda/cerdas').subscribe((data: any) => {
      this.cerdasList = data;
      console.log('Contenido de this.cerdasList:', this.cerdasList);
    });

    this.http.get('https://lechonsolutionsbackend-production.up.railway.app/controlcerda/barracos').subscribe((data: any) => {
      this.barracosList = data;
    });

    this.http.get('https://lechonsolutionsbackend-production.up.railway.app/controlcerda/pachas').subscribe((data: any) => {
      this.pachasList = data;

      
    });
    this.http.get('https://lechonsolutionsbackend-production.up.railway.app/controlcerda/productos').subscribe((data: any) => {
        this.productosList = data;

        
      });
    
  }
  guardarCambios() {
    console.log('DATOS A EDITAR HOY',this.usuario);
    // Utiliza el servicio usuarioService para enviar los cambios al servidor
    this.controlCerdaService.editar(this.usuario.id, this.usuario).subscribe(
      (response) => {
        // Manejar la respuesta exitosa del servidor, si es necesario
        console.log('Usuario actualizado exitosamente:', response);

        // Muestra el mensaje de éxito y cierra el modal
        this.exito = true;
        this.toastr.success('Barraco actualizado con éxito', 'Correcto!!',this.toastrConfigTime);
        // Cierra el modal después de 2 segundos (puedes ajustar el tiempo)
        setTimeout(() => {
          // Llama a refreshUserList para actualizar la lista de usuarios en el componente de lista
          this.activeModal.close('Guardado con éxito');
          this.InsertarParto();
        }, 2000);
      },
      (error) => {
        // Manejar errores en caso de que la actualización falle
        this.toastr.error('Error al actualizar el barraco, debes modificar al menos un dato', 'Incorrecto!!',this.toastrConfigTime);
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

  InsertarParto() {
    // Obtener el id_control_cerda del registro que se está editando
    const idControlCerda = this.usuario.id;
  
    // Calcular la fecha para fecha_posible_parto (fecha_confirmacion_carga + 114 días)
    const fechaConfirmacionCarga = new Date(this.usuario.fecha_confirmacion_carga);
    fechaConfirmacionCarga.setDate(fechaConfirmacionCarga.getDate() + 114);
    const fechaPosibleParto = fechaConfirmacionCarga.toISOString().slice(0, 10); // Formatea la fecha
  
    // Calcular la fecha para fecha_sala_parto (fecha_posible_parto - 8 días)
    const fechaPosiblePartoDate = new Date(fechaPosibleParto);
    fechaPosiblePartoDate.setDate(fechaPosiblePartoDate.getDate() - 8);
    const fechaSalaParto = fechaPosiblePartoDate.toISOString().slice(0, 10); // Formatea la fecha
  
    if (this.usuario.confirmar_carga === 'Cargada') {
      // Realiza la inserción en la tabla control_parto
      const controlPartoData = {
        id_control_cerda: idControlCerda,
        id_cerda: this.usuario.cerda_id,
        cerda_nombre:this.usuario.cerda_nombre,
        tipo_carga: this.usuario.tipo_carga,
        barraco_nombre: this.usuario.barraco_nombre,
        pacha_nombre:this.usuario.pacha_nombre,
        fecha_inseminacion: this.usuario.fecha_inseminacion,
        fecha_confirmacion_carga: this.usuario.fecha_confirmacion_carga,
        fecha_posible_parto: fechaPosibleParto,
        fecha_sala_parto: fechaSalaParto, // Agrega la fecha de sala de parto
        observaciones: this.usuario.observaciones
        // Añade otros campos según tu tabla control_parto
      };
  
      console.log('Datos a insertar en control_partoooooo:', controlPartoData);
  
      this.controlPartoService.insert(controlPartoData).subscribe(
        (response) => {
          // Manejar la respuesta exitosa si es necesario
          console.log('Inserción en control_parto exitosa:', response);
        },
        (error) => {
          // Manejar errores en caso de que la inserción falle
          console.error('Error al insertar en control_parto:', error);
        }
      );
    } else {
      // Si confirmar_carga no es "Cargada", simplemente muestra un mensaje
      console.log('No se insertará en control_parto ya que confirmar_carga no es "Cargada".');
    }
  }
  
  
  
  
  
  
  cancelar() {
    // Cierra el modal sin guardar cambios
    this.activeModal.close('Cancelado');
  }
  actualizarNombreCerda(cerdaId: any) {
    const cerdaIdNumber = typeof cerdaId === 'string' ? parseInt(cerdaId) : cerdaId;
  
    console.log(`Tipo de datos de cerdaIdNumber: ${typeof cerdaIdNumber}`);
    console.log(`Tipo de datos de cerda.id en el primer elemento de la lista: ${typeof this.cerdasList[0].id}`);
  
    const cerdaSeleccionada = this.cerdasList.find(cerda => cerda.id === cerdaIdNumber);
  
    if (cerdaSeleccionada) {
      this.usuario.cerda_nombre = cerdaSeleccionada.nombre;
      console.log(`Cerda seleccionada: ${cerdaSeleccionada.nombre}`);
    } else {
      this.usuario.cerda_nombre = '';
      console.log('Cerda no encontrada');
    }
  }
  

  actualizarNombreBarraco(barracoId: any) {
    const barracoIdNumber = typeof barracoId === 'string' ? parseInt(barracoId) : barracoId;
  
    console.log(`Tipo de datos de barracoIdNumber: ${typeof barracoIdNumber}`);
    console.log(`Tipo de datos de barraco.id en el primer elemento de la lista: ${typeof this.barracosList[0].id}`);
  
    const barracoSeleccionado = this.barracosList.find(barraco => barraco.id === barracoIdNumber);
  
    if (barracoSeleccionado) {
      this.usuario.barraco_nombre = barracoSeleccionado.nombre;
      console.log(`Barraco seleccionado: ${barracoSeleccionado.nombre}`);
    } else {
      this.usuario.barraco_nombre = '';
      console.log('Barraco no encontrado');
    }
  }
  actualizarNombreProducto(productoId: any) {
    const productoIdNumber = typeof productoId === 'string' ? parseInt(productoId) : productoId;
  
    console.log(`Tipo de datos de productoIdNumber: ${typeof productoIdNumber}`);
    console.log(`Tipo de datos de producto.id en el primer elemento de la lista: ${typeof this.productosList[0].id}`);
  
    const productoSeleccionado = this.productosList.find(producto => producto.id === productoIdNumber);
  
    if (productoSeleccionado) {
      this.usuario.producto_nombre = productoSeleccionado.nombreProducto;
      console.log(`Producto seleccionado: ${productoSeleccionado.nombreProducto}`);
    } else {
      this.usuario.producto_nombre = '';
      console.log('Producto no encontrado');
    }
  }
  
  calcularFechaConfirmacion() {
    if (this.usuario.fecha_inseminacion) {
      const fechaInseminacion = new Date(this.usuario.fecha_inseminacion);
      fechaInseminacion.setDate(fechaInseminacion.getDate() + 22); // Sumar 22 días
      this.usuario.fecha_confirmacion_carga = fechaInseminacion.toISOString().split('T')[0]; // Formatear como yyyy-MM-dd
    } else {
      this.usuario.fecha_confirmacion_carga = null; // Limpiar la fecha de confirmación si no hay fecha de inseminación
    }
  }

  confirmarSeleccion() {
    if (this.usuario.confirmar_carga === 'Cargada') {
      // Si la opción seleccionada es "Cargada", muestra la confirmación
      this.mostrarConfirmacion = true;
    }
  }
  
  aceptarSeleccion() {
    // Realizar la acción deseada, por ejemplo, marcar como "Cargada"
    // ... tu código aquí ...
  
    // Ocultar la confirmación
    this.mostrarConfirmacion = false;
  }
  
  cancelarSeleccion() {
    // Restablecer la selección a su valor anterior o realizar otras acciones necesarias
    this.usuario.confirmar_carga = ''; // Esto limpia la selección
    // ... tu código aquí ...
  
    // Ocultar la confirmación
    this.mostrarConfirmacion = false;
  }
  
}
