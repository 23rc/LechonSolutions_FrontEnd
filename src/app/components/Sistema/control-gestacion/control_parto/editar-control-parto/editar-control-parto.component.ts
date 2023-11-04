import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoPartoService } from 'src/app/services/infoParto.service';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { TemperaturaService } from 'src/app/services/temperatura.service';
import { ResumenPartoService } from 'src/app/services/resumenParto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EliminarTratamientoComponent } from '../modales/eliminar-tratamiento/eliminar-tratamiento/eliminar-tratamiento.component';
import { EditarTratamientoComponent } from '../modales/editar-tratamiento/editar-tratamiento/editar-tratamiento.component';
import { NuevoTratamientoComponent } from '../modales/nuevo-tratamiento/nuevo-tratamiento/nuevo-tratamiento.component';
import { EliminarTemperaturaComponent } from '../modales/eliminar-temperatura/eliminar-temperatura/eliminar-temperatura.component';
import { EliminarResumenPartoComponent } from '../modales/eliminar-resumen-parto/eliminar-resumen-parto.component';
import { EditarTemperaturaComponent } from '../modales/editar-temperatura/editar-temperatura/editar-temperatura.component';
import { NuevaTemperaturaComponent } from '../modales/nuevo-temperatura/nueva-temperatura/nueva-temperatura.component';
import { EliminarPartoComponent } from '../modales/eliminar-parto/eliminar-parto/eliminar-parto.component';
import { EditarPartoComponent } from '../modales/editar-parto/editar-parto/editar-parto.component';
import { NuevoPartoComponent } from '../modales/nuevo-parto/nuevo-parto/nuevo-parto.component';
import { PartoService } from 'src/app/services/parto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal
import { ToastrService } from 'ngx-toastr';
import { Directive, HostListener, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


import jwt_decode from 'jwt-decode';

interface MyToken {
  userId: string; // Define aquí cualquier otra propiedad que esperes en tu token
}



@Component({
  selector: 'app-editar-control-parto',
  templateUrl: './editar-control-parto.component.html',
  styleUrls: ['./editar-control-parto.component.css']
})
export class EditarControlPartoComponent {
  Tratamiento: any[] = [];
  Temperatura: any[] = [];
  ResumenParto: any[] = [];
  Parto: any[] = [];

  usuario: any = {  };
  /*usuario: any = {
    peso: 0,
    pesoFinal: 0,
    perdidaPeso: '0%' ,// Inicializa perdidaPeso como un porcentaje
    numero_partoP: null, // Valor predeterminado null
    id_cerda: '',
  };*/

  isLoading: boolean = true;
  exito: boolean = false;
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  modoEdicion = false; // Inicialmente, el formulario está en modo Nuevo

  infoPartoData: any = {};
  partoData: any = {};

  pageSize: number = 10; // Cantidad de registros por página
  currentPage: number = 0; // Página actual
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showConfirmationModal: boolean = false;
  ToDelete: any = null; // Almacena el usuario a eliminar
  showSuccessModal: boolean = false;
  sortedColumn: string | null = null; // Columna actualmente ordenada
  sortDirection: number = 1; // 1 para ascendente, -1 para descendente
  searchText: string = ''; // Texto de búsqueda
  claseCSSResultante: string = ''; 
  valorOriginalDeParto: number=0;
  idCerdaValue: any;
  numeroPartoValue: any;
  tratamientos: any[] = []; // Suponiendo que tu lista de tratamientos se almacena en esta variable
  @ViewChild('modalContent') modalContent: any;
  closeResult = '';
  tratamientoSeleccionado: any;
  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private infoPartoService: InfoPartoService,
    private tratamientoService: TratamientoService,
    private temperaturaService: TemperaturaService,
    private resumenPartoService: ResumenPartoService,
    private partoService: PartoService,
    private usuarioService: UsuarioService,
    private el: ElementRef
  ) {
    this.cargarTratamientos(); // Cargar los tratamientos al inicializar el componente
  }
ngOnInit(): void {
    // Verifica si es null y, si es así, establece el valor en 1
  
   
    // Verifica si es null y, si es así, establece el valor en 1
   this.tratamientoService.getData().subscribe(data => {
     console.log('Datos de Tratamiento:', data); // Agregar esta línea para verificar los datos
    this.Tratamiento = data;
      
  });   
  this.temperaturaService.getData().subscribe(data => {
    console.log('Datos de Temperatura:', data); // Agregar esta línea para verificar los datos
    this.Temperatura = data;
  });
  this.resumenPartoService.getData().subscribe(data => {
    console.log('Datos de Resumen Parto:', data); // Agregar esta línea para verificar los datos
    this.ResumenParto = data;
  });
  this.partoService.getData().subscribe(data => {
    console.log('Datos del Parto:', data); // Agregar esta línea para verificar los datos
    this.Parto = data;
  });

  this.obtenerInfoParto();
  this.obtenerDatosParto();

  if (this.infoPartoData.numero_partoP === null) {
    this.infoPartoData.numero_partoP = 1;
  }
}


obtenerInfoParto() {
  // Obtén el id_cerda del usuario
  const idCerda = this.usuario.id_cerda;

  // Realiza una solicitud al servidor para obtener los datos de info_parto basados en id_cerda
  this.http.get(`http://localhost:3000/infoparto/info-parto/${idCerda}`).subscribe((infoPartoData: any) => {
    // Asigna los datos de infoParto a la variable infoPartoData
    this.infoPartoData = infoPartoData;

    console.log('Datos de infoParto:', this.infoPartoData);

    // Realiza la lógica para calcular numero_partoP
    if (this.infoPartoData && this.infoPartoData.numero_partoP !== null) {
      // Si numero_partoP no es null, suma 1 al valor existente
      this.infoPartoData.numero_partoP = this.infoPartoData.numero_partoP + 1;
    } else {
      // Si numero_partoP es null, establece su valor en 1
      this.infoPartoData.numero_partoP = 1;
    }

    console.log('numero_partoP actualizado :', this.infoPartoData.numero_partoP);
  
  });
}

obtenerDatosParto() {
  // Obtén el idCerda y numeroParto que necesitas
  const idCerda = this.usuario.id_cerda; // Supongamos que obtuviste estos valores de alguna manera

  // Reemplaza el siguiente valor con el número de parto que deseas obtener
  const numeroParto = this.usuario.numero_partoP;

  console.log('ID Cerda:', idCerda);
  console.log('Número de Parto:', numeroParto);

  // Realiza una solicitud al servidor para obtener los datos de parto basados en idCerda y numeroParto
  this.http.get(`http://localhost:3000/infoparto/info-parto/${idCerda}/${numeroParto}`).subscribe((partoData: any) => {
    // Asigna los datos de parto a la variable partoData
    this.partoData = partoData;

    console.log('Datos de part0:', this.partoData);

    


    console.log('numero_partoP actualizado:', this.partoData.numero_partoP);
  

    // Realiza cualquier lógica adicional que necesites con los datos del parto aquí
  });
}

//*******************************************************************MODALES TRATAMIENTOS******************************************* */
abrirModalTratamiento( tratamiento: any) {

  const modalRef = this.modalService.open(EliminarTratamientoComponent, { 
    size: 'sm',
    backdrop: 'static',
    keyboard: false,
    windowClass: 'modal-eliminar',
   });

  modalRef.result.then((result) => {
    if (result === 'Aceptar') {
      this.eliminarRegistroTratamiento(tratamiento.id);
    }
  }).then(() => {
    // Cierra el modal dentro de esta función
    this.actualizarTablaTratamiento();
  });
}
cargarTratamientos() {
  // Lógica para cargar la lista de tratamientos desde tu API o servicio
  this.http.get('http://localhost:3000/tratamiento').subscribe(
    (data: any) => {
      this.tratamientos = data;
      console.log('Datos de tratamientos cargados:', data);
    },
    (error) => {
      console.error('Error al cargar tratamientos', error);
    }
  );
}
eliminarRegistroTratamiento(id: any) {
  this.http.delete(`http://localhost:3000/tratamiento/tratamientoEliminar/${id}`).subscribe(
    () => {
      // Proceso de eliminación exitoso
      console.log('Registro eliminado con éxito');
      // Actualiza la variable Tratamiento después de la eliminación
      this.Tratamiento = this.Tratamiento.filter(item => item.id !== id);
      // Forzar la detección de cambios
      this.changeDetectorRef.detectChanges();
    },
    (error) => {
      // Error al eliminar el registro
      console.error('Error al eliminar el tratamiento', error);
      // Maneja el error según sea necesario
    }
  );
}
actualizarTablaTratamiento() {
  this.cargarTratamientos(); // Vuelve a cargar los datos de tratamientos
}
editarTratamiento(contenedorLocal: any) {
  console.log('Usuario a editar:', contenedorLocal);
  const id = contenedorLocal.id;
  const modalRef = this.modalService.open(EditarTratamientoComponent, {
    size: 'sm', // Tamaño pequeño
    backdrop: 'static',
    keyboard: false,
    windowClass: 'modal-editar-tratamiento',
  });

  modalRef.componentInstance.usuario = contenedorLocal;

  modalRef.result.then(
    (result) => {
      // El modal se cerró con éxito, ahora actualiza la lista de usuarios
      this.refreshListTratamiento();
    },
    (reason) => {
      // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
    }
  );
}
async verificarNumeroPartoEnBackend(idCerda: number, numeroParto: number): Promise<boolean> {
  try {
    const response = await this.http.get<boolean>(`http://localhost:3000/infoparto/verificar?cerdaId=${idCerda}&numeroParto=${numeroParto}`).toPromise();

    if (response !== undefined) {
      // La respuesta no es undefined, es un valor booleano
      return response;
    } else {
      // La respuesta es undefined, maneja esto de acuerdo a tus necesidades
      console.log('La respuesta es undefined, maneja esto según tus necesidades.');
      return false; // O cualquier otro valor predeterminado
    }
  } catch (error) {
    console.error('Error al verificar el número de parto en el backend:', error);
    return false;
  }
}
async nuevoTratamiento(contenedorLocal: any) {
  const idCerda = contenedorLocal.id_cerda;
  const numeroParto = contenedorLocal.numero_partoP;

  // Verifica si el número de parto ya existe
  const existeNumeroParto = await this.verificarNumeroPartoEnBackend(idCerda, numeroParto);

  if (existeNumeroParto) {
    // La cerda ya tiene ese número de parto, procede con el proceso de nuevo tratamiento
    console.log('La cerda ya tiene ese número de parto, procede con el nuevo tratamiento');

    const valor = 'Este es un valor de ejemplo';

    const modalRef = this.modalService.open(NuevoTratamientoComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modal-nuevo-tratamiento',
    });

    modalRef.componentInstance.parametro = contenedorLocal;

    modalRef.result.then(
      (result) => {
        // El modal se cerró con éxito, ahora actualiza la lista de tratamientos
        this.refreshListTratamiento();
      },
      (reason) => {
        // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
      }
    );
  } else {
    // La cerda no tiene ese número de parto, muestra un mensaje de error con ngx-toastr
    this.toastr.error('Debes crear primero el parto nuevo', 'Error');
  }
}
refreshListTratamiento() {
  this.tratamientoService.getData().subscribe(data => {
    console.log('Datos de tratamientos:', data);
    this.Tratamiento = data;
  });
}
//*******************************************************************MODALES TEMPERATURA******************************************* */
abrirModalTemperatura( temperatura: any) {

  const modalRef = this.modalService.open(EliminarTemperaturaComponent, { 
    size: 'sm',
    backdrop: 'static',
    keyboard: false,
    windowClass: 'modal-eliminar',
   });
  modalRef.result.then((result) => {
    if (result === 'Aceptar') {
      this.eliminarRegistroTemperatura(temperatura.id);
    }
  }).then(() => {
    // Cierra el modal dentro de esta función
    this.actualizarTablaTemperatura();
  });
}
eliminarRegistroTemperatura(id: any) {
  this.http.delete(`http://localhost:3000/temperatura/eliminarTemperatura/${id}`).subscribe(
    () => {
      // Proceso de eliminación exitoso
      console.log('Registro eliminado con éxito');
      // Actualiza la variable Tratamiento después de la eliminación
      this.Temperatura = this.Temperatura.filter(item => item.id !== id);
      // Forzar la detección de cambios
      this.changeDetectorRef.detectChanges();
    },
    (error) => {
      // Error al eliminar el registro
      console.error('Error al eliminar el tratamiento', error);
      // Maneja el error según sea necesario
    }
  );
}
actualizarTablaTemperatura() {
  this.cargarTemperatura(); // Vuelve a cargar los datos de tratamientos
}
cargarTemperatura() {
  // Lógica para cargar la lista de tratamientos desde tu API o servicio
  this.http.get('http://localhost:3000/temperatura').subscribe(
    (data: any) => {
      this.tratamientos = data;
      console.log('Datos de tratamientos cargados:', data);
    },
    (error) => {
      console.error('Error al cargar tratamientos', error);
    }
  );
}
editarTemperatura(contenedorLocal: any) {
  console.log('Usuario a editar:', contenedorLocal);
  const id = contenedorLocal.id;
  const modalRef = this.modalService.open(EditarTemperaturaComponent, {
    size: 'sm', // Tamaño pequeño
    backdrop: 'static',
    keyboard: false,
    windowClass: 'modal-editar-tratamiento',
  });

  modalRef.componentInstance.usuario = contenedorLocal;

  modalRef.result.then(
    (result) => {
      // El modal se cerró con éxito, ahora actualiza la lista de usuarios
      this.refreshListTemperatura();
    },
    (reason) => {
      // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
    }
  );
}
refreshListTemperatura() {
  this.temperaturaService.getData().subscribe(data => {
    console.log('Datos de temperatura:', data);
    this.Temperatura = data;
  });
}
async nuevaTemperatura(contenedorLocal: any) {
  const idCerda = contenedorLocal.id_cerda;
  const numeroParto = contenedorLocal.numero_partoP;

  // Verifica si el número de parto ya existe
  const existeNumeroParto = await this.verificarNumeroPartoEnBackend(idCerda, numeroParto);

  if (existeNumeroParto) {
    // La cerda ya tiene ese número de parto, procede con el proceso de nuevo tratamiento
    console.log('La cerda ya tiene ese número de parto, procede con el nuevo tratamiento');

    const valor = 'Este es un valor de ejemplo';

    const modalRef = this.modalService.open(NuevaTemperaturaComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modal-nuevo-tratamiento',
    });

    modalRef.componentInstance.parametro = contenedorLocal;

    modalRef.result.then(
      (result) => {
        // El modal se cerró con éxito, ahora actualiza la lista de tratamientos
        this.refreshListTemperatura();
      },
      (reason) => {
        // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
      }
    );
  } else {
    // La cerda no tiene ese número de parto, muestra un mensaje de error con ngx-toastr
    this.toastr.error('Debes crear primero el parto nuevo', 'Error');
  }
}
//*******************************************************************MODALES PARTO******************************************* */
abrirModalParto( parto: any) {

  const modalRef = this.modalService.open(EliminarPartoComponent, { 
    size: 'sm',
    backdrop: 'static',
    keyboard: false,
    windowClass: 'modal-eliminar',
   });

  modalRef.result.then((result) => {
    if (result === 'Aceptar') {
      this.eliminarRegistroParto(parto.id);
    }
  }).then(() => {
    // Cierra el modal dentro de esta función
    this.actualizarTablaParto();

  });
}


abrirModalResumenParto( ResumenParto: any) {

  const modalRef = this.modalService.open(EliminarResumenPartoComponent, { 
    size: 'sm',
    backdrop: 'static',
    keyboard: false,
    windowClass: 'modal-eliminar',
   });

  modalRef.result.then((result) => {
    if (result === 'Aceptar') {
      this.eliminarRegistroResumenParto(ResumenParto.id);
    }
  }).then(() => {
    // Cierra el modal dentro de esta función
    this.actualizarTablaResumenParto();
  });
}
actualizarTablaResumenParto() {
  this.cargarResumenParto(); // Vuelve a cargar los datos de tratamientos
}
cargarResumenParto() {
  // Lógica para cargar la lista de tratamientos desde tu API o servicio
  this.http.get('http://localhost:3000/resumenparto').subscribe(
    (data: any) => {
      this.ResumenParto = data;
      console.log('Datos de tratamientos cargados:', data);
    },
    (error) => {
      console.error('Error al cargar tratamientos', error);
    }
  );
}
eliminarRegistroResumenParto(id: any) {
  this.http.delete(`http://localhost:3000/resumenparto/resumenPartoEliminar/${id}`).subscribe(
    () => {
      // Proceso de eliminación exitoso
      console.log('Registro eliminado con éxito');
      // Actualiza la variable Tratamiento después de la eliminación
      this.Tratamiento = this.Tratamiento.filter(item => item.id !== id);
      // Forzar la detección de cambios
      this.changeDetectorRef.detectChanges();
      this.refreshListResumenParto();
    },
    (error) => {
      // Error al eliminar el registro
      console.error('Error al eliminar el tratamiento', error);
      // Maneja el error según sea necesario
    }
  );
}
eliminarRegistroParto(id: any) {
  this.http.delete(`http://localhost:3000/parto/eliminarParto/${id}`).subscribe(
    () => {
      // Proceso de eliminación exitoso
      console.log('Registro eliminado con éxito');
      // Actualiza la variable Tratamiento después de la eliminación
      this.Parto = this.Parto.filter(item => item.id !== id);
      // Forzar la detección de cambios
      this.changeDetectorRef.detectChanges();
      this.refreshListParto();
      this.refreshListResumenParto();
    },
    (error) => {
      // Error al eliminar el registro
      console.error('Error al eliminar el parto', error);
      // Maneja el error según sea necesario
    }
  );
}

restablecerHoraFinal(usuario: any) {
  // Obtener el rol del usuario
  const usuarios = this.usuarioService.getNameAndRole();
  const rol = usuarios.rol; // Supongamos que el rol se encuentra en la propiedad 'rol'

  // Verificar el rol del usuario
  if (rol === 'Administrador') {
    // El usuario es administrador, puede ejecutar la acción
    console.log('Usuario con rol de Administrador.');

    // Crear un objeto JSON con los datos necesarios
    const datosBorrado = {
      id_cerda: usuario.id_cerda,
      numero_parto: usuario.numero_partoP
    };

    // Muestra los datos que se están enviando al backend
    console.log('Datos enviados al backend:', datosBorrado);

    // Realiza una solicitud DELETE al backend con los datos en el cuerpo
    this.http.delete('http://localhost:3000/parto/borrarHoraFinal', { body: datosBorrado }).subscribe(
      (response: any) => {
        console.log(response.message); // Mensaje exitoso
        // Muestra un mensaje de éxito utilizando Toastr
        this.toastr.success('La hora se restableció correctamente', 'Éxito', this.toastrConfigTime);
        // Puedes agregar más acciones aquí si es necesario
        this.refreshListParto();
        this.refreshListResumenParto();
      },
      (error: any) => {
        console.error(error.error.message); // Mensaje de error
        // Aquí puedes manejar el error, como mostrar un mensaje de error utilizando Toastr
        this.toastr.error('Error al restablecer la hora', 'Error', this.toastrConfigTime);
      }
    );

  } else {
    // El usuario no es administrador, mostrar un mensaje de advertencia
    console.log('El usuario no tiene permisos para esta acción.');
    // Mostrar un mensaje al usuario utilizando Toastr
    this.toastr.warning('No tiene permisos para esta acción', 'Advertencia', this.toastrConfigTime);
  }
}






actualizarTablaParto() {
  this.cargarParto(); // Vuelve a cargar los datos de tratamientos
}
cargarParto() {
  // Lógica para cargar la lista de tratamientos desde tu API o servicio
  this.http.get('http://localhost:3000/parto').subscribe(
    (data: any) => {
      this.tratamientos = data;
      console.log('Datos de partos cargados:', data);
    },
    (error) => {
      console.error('Error al cargar partos', error);
    }
  );
}
async nuevoParto(contenedorLocal: any) {
  const idCerda = contenedorLocal.id_cerda;
  const numeroParto = contenedorLocal.numero_partoP;

  // Verifica si el número de parto ya existe
  const existeNumeroParto = await this.verificarNumeroPartoEnBackend(idCerda, numeroParto);

  if (existeNumeroParto) {
    // La cerda ya tiene ese número de parto, procede con el proceso de nuevo tratamiento
    console.log('La cerda ya tiene ese número de parto, procede con el nuevo tratamiento');

    const valor = 'Este es un valor de ejemplo';

    const modalRef = this.modalService.open(NuevoPartoComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modal-nuevo-tratamiento',
    });

    modalRef.componentInstance.parametro = contenedorLocal;

    modalRef.result.then(
      (result) => {
        // El modal se cerró con éxito, ahora actualiza la lista de tratamientos
        this.refreshListParto();
        this.refreshListResumenParto();
      },
      (reason) => {
        // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
      }
    );
  } else {
    // La cerda no tiene ese número de parto, muestra un mensaje de error con ngx-toastr
    this.toastr.error('Debes crear primero el parto nuevo', 'Error');
  }
}
refreshListParto() {
  this.partoService.getData().subscribe(data => {
    console.log('Datos del parto:', data);
    this.Parto = data;
  });
}
refreshListResumenParto() {
  this.resumenPartoService.getData().subscribe(data => {
    console.log('Datos del resumen parto:', data);
    this.ResumenParto = data;
  });
}
editarParto(contenedorLocal: any) {
  console.log('Parto a editar:', contenedorLocal);
  const id = contenedorLocal.id;
  const modalRef = this.modalService.open(EditarPartoComponent, {
    size: 'sm', // Tamaño pequeño
    backdrop: 'static',
    keyboard: false,
    windowClass: 'modal-editar-tratamiento',
  });

  modalRef.componentInstance.usuario = contenedorLocal;

  modalRef.result.then(
    (result) => {
      // El modal se cerró con éxito, ahora actualiza la lista de usuarios
      this.refreshListParto();
      this.refreshListResumenParto();
    },
    (reason) => {
      // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
    }
  );
}

getClassForCondition(numeroParto: number, idCerda: number, inputNumeroParto: number, inputIdCerda: number): string {
  if (inputNumeroParto === null || inputIdCerda === null) {
    return 'mostrar'; // Mostrar todas las filas si no hay valores en los inputs
  } else if (numeroParto === inputNumeroParto && idCerda === inputIdCerda) {
    return 'mostrar'; // Clase CSS para mostrar la fila
  } else {
    return 'ocultar'; // Clase CSS para ocultar la fila
  }
}
sortTable(column: string) {
  if (this.sortedColumn === column) {
    this.sortDirection *= -1;
  } else {
    this.sortedColumn = column;
    this.sortDirection = 1;
  }
}
alternarModoEdicion() {
  this.modoEdicion = !this.modoEdicion;
  if (this.modoEdicion) {
    // Estás entrando en modo de edición, almacena el valor original
    this.valorOriginalDeParto = this.partoData.numero_partoP;
    // Ahora puedes cambiar el valor de partoData.numero_partoP según tus necesidades
    this.partoData.numero_partoP = this.infoPartoData.numero_partoP;
    this.refreshListParto();
  } else {
    // Estás volviendo al modo de visualización, restaura el valor original
    this.partoData.numero_partoP = this.valorOriginalDeParto;
    this.refreshListParto();
  }
}

resetearFormulario() {
  // Implementa la lógica para restablecer los valores del formulario
  // Por ejemplo, puedes establecer todos los valores en blanco y deshabilitar los campos nuevamente
} 
  // Función para calcular la diferencia de peso
  calcularDiferenciaDePeso() {
    const peso = parseFloat(this.infoPartoData.peso);
    const pesoFinal = parseFloat(this.infoPartoData.pesoFinal);

    if (!isNaN(peso) && !isNaN(pesoFinal)) {
      const diferencia = pesoFinal - peso;
      const porcentajeDiferencia = ((diferencia / peso) * 100).toFixed(2); // Redondea el porcentaje a 2 decimales
      this.infoPartoData.perdidaPeso = porcentajeDiferencia + '%';
    } else {
      // Si los valores no son números válidos, reinicia perdidaPeso a '0%'
      this.infoPartoData.perdidaPeso = '0%';
    }
  }

  transformarDatosParaInsertar(): any {
    // Realiza la transformación de datos aquí
    const datosTransformados = {
      id_control_cerdaP:this.usuario.id_control_cerda,
      id_cerdaP: this.usuario.id_cerda,
      numero_partoP: this.infoPartoData.numero_partoP,
      cerda_nombreP: this.usuario.cerda_nombre,
      fecha_posible_partoP: this.usuario.fecha_posible_parto,
      tetasP: this.infoPartoData.tetas,
      tipo_cargaP: this.usuario.tipo_carga,
      nombre_barracoP: this.usuario.barraco_nombre,
      pacha_nombreP: this.usuario.pacha_nombre,
      pesoP: this.infoPartoData.peso,
      pesoFinalP: this.infoPartoData.pesoFinal,
      perdidaPesoP: this.infoPartoData.perdidaPeso,
      atendidoPor: this.infoPartoData.atendidoPor,
      // Agrega otros campos de la tabla si es necesario
    };
  
    return datosTransformados;
  }
  insertarInfoParto() {
    const datosTransformados = this.transformarDatosParaInsertar();
    console.log('Datos a enviar al backend:', datosTransformados); // Agregar este console.log
    this.infoPartoService.insert(datosTransformados).subscribe(
      (response) => {
        // Manejar la respuesta exitosa del servidor, si es necesario
        console.log('controlParto insertado exitosamente:', response);
        // Muestra un mensaje de éxito o realiza cualquier otra acción necesaria
        this.toastr.success('Control de parto insertado con éxito', 'Correcto!!', this.toastrConfigTime);
        // Cierra el modal después de 2 segundos (puedes ajustar el tiempo)
       setTimeout(() => {
          this.activeModal.close();
        }, 2000);
      },
      (error) => {
        // Manejar errores en caso de que la inserción falle
        this.toastr.error('Error al insertar el control de parto', 'Incorrecto!!', this.toastrConfigTime);
        console.error('Error al insertar el control de parto:', error);
      }
    );
  }
  
  cancelar() {
     // Cierra el modal sin guardar cambios
    this.activeModal.close('Cancelado');
  }

}
