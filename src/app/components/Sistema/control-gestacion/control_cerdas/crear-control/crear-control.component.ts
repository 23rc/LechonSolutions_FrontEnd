import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ControlCerdaService } from 'src/app/services/controlCerda.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-crear-control',
  templateUrl: './crear-control.component.html',
  styleUrls: ['./crear-control.component.css']
})
export class CrearControlComponent  implements OnInit{
  @Pipe({
    name: 'filterCerdas'
  })
  cerdasList: any[] = [];
  barracosList: any[] = [];
  pachasList: any[] = [];
  productosList: any[] = [];

  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos

  contenedorDB: any = {
    id:null,
    cerda_id: '',
    cerda_nombre: '',
    barraco_id: null,
    barraco_nombre: '',
    pacha_id: null,
    pacha_nombre: '',
    productoNombre:'',
    tipo_carga: '',
    fecha_inseminiacion: '',
    fecha_confirmacion_carga: '',
    confirmar_carga: 'No Cargada',
    observaciones: ''
  };



  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private controlCerdaService: ControlCerdaService, public activeModal: NgbActiveModal) {}


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
    actualizarNombreCerda(cerdaId: any) {
      const cerdaIdNumber = typeof cerdaId === 'string' ? parseInt(cerdaId) : cerdaId;
    
      console.log(`Tipo de datos de cerdaIdNumber: ${typeof cerdaIdNumber}`);
      console.log(`Tipo de datos de cerda.id en el primer elemento de la lista: ${typeof this.cerdasList[0].id}`);
    
      const cerdaSeleccionada = this.cerdasList.find(cerda => cerda.id === cerdaIdNumber);
    
      if (cerdaSeleccionada) {
        this.contenedorDB.cerda_nombre = cerdaSeleccionada.nombre;
        console.log(`Cerda seleccionada: ${cerdaSeleccionada.nombre}`);
      } else {
        this.contenedorDB.cerda_nombre = '';
        console.log('Cerda no encontrada');
      }
    }
    

    actualizarNombreBarraco(barracoId: any) {
      const barracoIdNumber = typeof barracoId === 'string' ? parseInt(barracoId) : barracoId;
    
      console.log(`Tipo de datos de barracoIdNumber: ${typeof barracoIdNumber}`);
      console.log(`Tipo de datos de barraco.id en el primer elemento de la lista: ${typeof this.barracosList[0].id}`);
    
      const barracoSeleccionado = this.barracosList.find(barraco => barraco.id === barracoIdNumber);
    
      if (barracoSeleccionado) {
        this.contenedorDB.barraco_nombre = barracoSeleccionado.nombre;
        console.log(`Barraco seleccionado: ${barracoSeleccionado.nombre}`);
      } else {
        this.contenedorDB.barraco_nombre = '';

        console.log('Barraco no encontrado');
      }
    }
    

    actualizarNombrePacha(pachaId: any) {
      const pachaIdNumber = typeof pachaId === 'string' ? parseInt(pachaId) : pachaId;
    
      console.log(`Tipo de datos de pachaIdNumber: ${typeof pachaIdNumber}`);
      console.log(`Tipo de datos de pacha.id en el primer elemento de la lista: ${typeof this.pachasList[0].id}`);
    
      const pachaSeleccionado = this.pachasList.find(pacha => pacha.id === pachaIdNumber);
    
      if (pachaSeleccionado) {
        this.contenedorDB.pacha_nombre = pachaSeleccionado.nombre;
        console.log(`pacha seleccionado: ${pachaSeleccionado.nombre}`);
      } else {
        this.contenedorDB.pacha_nombre = '';
        console.log('pacha no encontrado');
      }
    }
    actualizarNombreProducto(productoId: any) {
      const productoIdNumber = typeof productoId === 'string' ? parseInt(productoId) : productoId;
    
      console.log(`Tipo de datos de productoIdNumber: ${typeof productoIdNumber}`);
      console.log(`Tipo de datos de producto.id en el primer elemento de la lista: ${typeof this.productosList[0].id}`);
    
      const productoSeleccionado = this.productosList.find(producto => producto.id === productoIdNumber);
    
      if (productoSeleccionado) {
        this.contenedorDB.pacha_nombre = productoSeleccionado.nombreProducto;
        console.log(`Producto seleccionado: ${productoSeleccionado.nombreProducto}`);
      } else {
        this.contenedorDB.pacha_nombre = '';
        console.log('Producto no encontrado');
      }
    }
    
    // ...

    
    calcularFechaConfirmacion() {
      if (this.contenedorDB.fecha_inseminacion) {
        const fechaInseminacion = new Date(this.contenedorDB.fecha_inseminacion);
        fechaInseminacion.setDate(fechaInseminacion.getDate() + 22); // Sumar 22 días
        this.contenedorDB.fecha_confirmacion_carga = fechaInseminacion.toISOString().split('T')[0]; // Formatear como yyyy-MM-dd
      } else {
        this.contenedorDB.fecha_confirmacion_carga = null; // Limpiar la fecha de confirmación si no hay fecha de inseminación
      }
    }
    
insertar() {
  // Verificar que todos los campos necesarios estén completos
  if (
    !this.contenedorDB.cerda_id ||
    !this.contenedorDB.cerda_nombre ||
    !this.contenedorDB.tipo_carga
  ) {
    this.toastr.warning('Por favor, completa todos los campos obligatorios', 'Advertencia', this.toastrConfigTime);
    return;
  }

  // Crear un objeto con los datos a insertar en la tabla control_cerda
  const nuevoControlCerda = {
    cerda_id: this.contenedorDB.cerda_id ?? null,
    cerda_nombre: this.contenedorDB.cerda_nombre ?? null,
    barraco_id: this.contenedorDB.barraco_id ?? null,
    barraco_nombre: this.contenedorDB.barraco_nombre ?? null,

    producto_nombre: this.contenedorDB.pacha_nombre ?? null,
    tipo_carga: this.contenedorDB.tipo_carga ?? null,
    fecha_inseminacion: this.contenedorDB.fecha_inseminacion || null,
    fecha_confirmacion_carga: this.contenedorDB.fecha_confirmacion_carga || null,
    confirmar_carga: this.contenedorDB.confirmar_carga || null,
    observaciones: this.contenedorDB.observaciones || null,
    producto_id: this.contenedorDB.id ?? null // Asignar el valor correcto para producto_id
  };
  
  
  console.log('Datos a insertar en control_cerda:', nuevoControlCerda);
  // Llamar al servicio para insertar el registro en la base de datos
  this.controlCerdaService.insert(nuevoControlCerda).subscribe(
    () => {
      this.toastr.success('Registro de control de cerda insertado con éxito', 'Correcto!!', this.toastrConfigTime);
      setTimeout(() => {
        this.activeModal.close('');
      }, 2000);
    },
    (error) => {
      if (error.error && error.error.error) {
        this.toastr.error(error.error.error, 'Error', this.toastrConfigTime);
      } else {
        this.toastr.error('Error al insertar el registro de control de cerda', 'Incorrecto!!', this.toastrConfigTime);
      }
      console.error('Error al insertar el registro de control de cerda', error);
    }
  );
}


  cancelar() {
    this.activeModal.dismiss('cancelar');
  }
}
