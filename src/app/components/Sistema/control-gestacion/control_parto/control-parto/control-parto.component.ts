import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { CrearControlPartoComponent  } from '../crear-control-parto/crear-control-parto.component';
import { EditarControlPartoComponent  } from '../editar-control-parto/editar-control-parto.component';
import { ModalConfirmacionComponent  } from '../modal-confirmacion/modal-confirmacion.component';
import { ControlPartoService  } from 'src/app/services/controlParto.service'; // Importa el nuevo servicio
import { ElementRef } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import 'bootstrap';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-control-parto',
  templateUrl: './control-parto.component.html',
  styleUrls: ['./control-parto.component.css']
})
export class ControlPartoComponent {
  showModal = false; // Variable para mostrar/ocultar el modal


  contenedorDBB: any[] = [];
  usuarios: any[] = [];
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
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos

  selectedContenedorLocal: any;  // Propiedad para almacenar la cerda seleccionada


  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private controlPartoService: ControlPartoService,private authService: AuthService, private modalService: NgbModal, private router: Router) {
    this.sortedColumn = 'id'; // Establece la columna inicialmente ordenada
    this.sortDirection = 1; // 1 para ascendente, -1 para descendente (puede ajustarlo según su preferencia)

  }

  ngOnInit(): void {

    this.controlPartoService.getDataa().subscribe(data => {
      console.log('Datos de de control de parto real:', data); // Agregar esta línea para verificar los datos
      this.contenedorDBB = data;
      
    });  
  }
  get uniqueCerdas() {
    const uniqueIds = new Set();
    return this.filtered.filter((ContenedorLocal) => {
      const idCerda = ContenedorLocal.id_cerda ? ContenedorLocal.id_cerda.toString() : 'NULL';
      if (!uniqueIds.has(idCerda)) {
        uniqueIds.add(idCerda);
        return true;
      }
      return false;
    });
  }

  nextPage() {
    if (this.currentPage < this.contenedorDBB.length / this.pageSize - 1) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  // Función para mostrar el modal de confirmación
  showDeleteConfirmation(contenedorLocal: any) {
    this.ToDelete = contenedorLocal;
    this.showConfirmationModal = true;
  }
  showSuccessMessage(message: string) {
    this.successMessage = message;

    // Cierra automáticamente el mensaje de éxito después de 3000 milisegundos (3 segundos)
    setTimeout(() => {
      this.closeSuccessAlert();
    }, 1000);
  }

  // Función para confirmar la eliminación
  confirmDelete() {
    this.controlPartoService.delete(this.ToDelete.id).subscribe(
      () => {
        this.contenedorDBB = this.contenedorDBB.filter(u => u.id !== this.ToDelete.id);
        this.toastr.success('Registro eliminado con éxito', 'Correcto!!', this.toastrConfigTime);
        
        // Ocultar el modal de confirmación después de eliminar
        this.showConfirmationModal = false;
      },
      (error) => {
        console.error('Error al eliminar el barraco', error);
        this.toastr.error('Error al eliminar el registro', 'Incorrecto!!', this.toastrConfigTime);
   
        // Ocultar el modal en caso de error
        this.showConfirmationModal = false;
      }
    );
  }

  // Función para cancelar la eliminación
  cancelDelete() {
    this.closeDeleteConfirmation();
  }

  // Función para ocultar el modal de confirmación
  closeDeleteConfirmation() {
    this.showConfirmationModal = false;
    this.ToDelete = null;
    
  }

  closeSuccessAlert() {
    this.successMessage = null;
   
  }

  closeErrorAlert() {
    this.errorMessage = null;
  }

  // Agrega una propiedad para controlar la visibilidad del modal


  // Función para abrir el modal
  openModal() {
    this.showModal = true;
  }

  /**APERTURA DEL MODAL NUEVO USUARIO */
  openNuevo() {
    const valor = 'Este es un valor de ejemplo';
  
    const modalRef = this.modalService.open(CrearControlPartoComponent, {
      size: 'ls', // Cambiar a 'sm' para un modal pequeño
      backdrop: 'static', // Desactiva el efecto de oscurecimiento de fondo
      keyboard: false,
      windowClass: 'modal-vertical-center modal-horizontal-center',
    });
  
    modalRef.componentInstance.parametro = valor;
  
    modalRef.result.then(
      (result) => {
        // El modal se cerró con éxito, ahora actualiza la lista de usuarios
        this.refreshList();
      },
      (reason) => {
        // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
      }
    );
  }
  

  closeModal() {
    this.showModal = false;
  }
  createNewRecord() {
    // Incrementa el valor de numero_partoP en 1
   
  
    // Llama a la función editar con los datos necesarios
    this.editar({/* Aquí debes proporcionar los datos necesarios para la función editar */});
  }
  
  confirmEdit(contenedorLocal: any) {
    // Aquí puedes implementar la lógica para editar el registro
    // Por ejemplo, puedes mostrar un mensaje de alerta:
    this.toastr.success('Has hecho clic en Editar para el registro: ' + contenedorLocal.id);
  }

  nuevo(contenedorLocal: any) {
    console.log('Usuario a editar:', contenedorLocal);
  
    const modalRef = this.modalService.open(EditarControlPartoComponent, {
      size: 'xl',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modalgrande modal-horizontal-center',
    });
  
    // Verifica si el número de parto actual es null o indefinido
    if (contenedorLocal.numero_partoP === null || contenedorLocal.numero_partoP === undefined) {
      // Si es null o indefinido, establece el valor en 1
      contenedorLocal.numero_partoP = 1;
    } else {
      // Si ya tiene un valor, suma 1 al valor actual
      contenedorLocal.numero_partoP = contenedorLocal.numero_partoP + 1;
    }
  
    modalRef.componentInstance.usuario = contenedorLocal;
  
    modalRef.result.then(
      (result) => {
        // El modal se cerró con éxito, ahora actualiza la lista de usuarios
        this.refreshList();
      },
      (reason) => {
        // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
      }
    );
  }
  

  async openEditarAlert(contenedorLocal: any) {
    console.log('Info_parto a editar:', contenedorLocal);
    const modalRef = this.modalService.open(ModalConfirmacionComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 'modal-confirmacion1',
    });
  
    try {
      const response = await this.http.get<number>(`https://lechonsolutionsbackend-production.up.railway.app/infoparto/obtener-ultimo-parto-info?cerdaId=${contenedorLocal.id_cerda}`).toPromise();
  
      if (response !== undefined) {
        // El backend ha devuelto el último número de parto
        modalRef.componentInstance.ultimoParto = response; // Asignar el valor al componente ModalConfirmacionComponent
      }
    } catch (error) {
      console.error('Error al obtener el último número de parto:', error);
    }
  
    modalRef.result.then(
      async (result) => {
        if (result !== undefined) {
          const numeroParto = parseInt(result, 10);
  
          modalRef.componentInstance.numParto = result; // Asignar el valor de numParto en el modal
          contenedorLocal.numero_partoP = numeroParto; // Asignar el valor
          console.log('Valor de parto_numeroP:', contenedorLocal.numero_partoP); // Agregar este console.log
          this.editar(contenedorLocal);
        }
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
  
  
  
  editar(contenedorLocal: any) {
    console.log('Usuario a editar:', contenedorLocal);
    const id = contenedorLocal.id;
    const modalRef = this.modalService.open(EditarControlPartoComponent, {
      size: 'xl',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modalgrande modal-horizontal-center',
    });
  
    modalRef.componentInstance.usuario = contenedorLocal;
  
    modalRef.result.then(
      (result) => {
        // El modal se cerró con éxito, ahora actualiza la lista de usuarios
        this.refreshList();
      },
      (reason) => {
        // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
      }
    );
  }
  
  refreshList() {
    this.controlPartoService.getData().subscribe(data => {
      console.log('Datos de usuarios:', data);
      this.contenedorDBB = data;
    });
  }
  // Función para ordenar la tabla por una columna
  sortTable(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortedColumn = column;
      this.sortDirection = 1;
    }
  
    this.contenedorDBB.sort((a, b) => {
      const valueA = a[column] != null ? (column === 'id' ? a[column].toString() : a[column].toString().toLowerCase()) : '';
      const valueB = b[column] != null ? (column === 'id' ? b[column].toString() : b[column].toString().toLowerCase()) : '';
  
      if (column === 'id') {
        // Si es la columna de ID, compara como números
        return (Number(valueA) - Number(valueB)) * this.sortDirection;
      } else {
        // Para otras columnas, compara como cadenas de texto en minúsculas
        return valueA.localeCompare(valueB) * this.sortDirection;
      }
    });
  }
// Función para filtrar usuarios por búsqueda
get filtered() {
  console.log('searchText:', this.searchText); 
  return this.contenedorDBB.filter(ContenedorLocal => {
    const id = ContenedorLocal.id ? ContenedorLocal.id.toString() : 'NULL';
    const id_control_cerda = ContenedorLocal.id_control_cerda ? ContenedorLocal.id_control_cerda.toString() : 'NULL';
    const id_cerda = ContenedorLocal.id_cerda ? ContenedorLocal.id_cerda.toString() : 'NULL';
    const cerda_nombre = ContenedorLocal.cerda_nombre || 'NULL';
    const tipo_carga = ContenedorLocal.tipo_carga || 'NULL';
    const barraco_nombre = ContenedorLocal.barraco_nombre || 'NULL';
    const pacha_nombre = ContenedorLocal.pacha_nombre || 'NULL';
    const fecha_inseminacion = ContenedorLocal.fecha_inseminacion || 'NULL';
    const fecha_confirmacion_carga = ContenedorLocal.fecha_confirmacion_carga || 'NULL';
    const fecha_posible_parto = ContenedorLocal.fecha_posible_parto || 'NULL';
    const fecha_sala_parto = ContenedorLocal.fecha_sala_parto || 'NULL';
    const observaciones = ContenedorLocal.observaciones || 'NULL';

    return (
      id.includes(this.searchText.toLowerCase()) ||
      id_control_cerda.includes(this.searchText.toLowerCase()) ||
      id_cerda.includes(this.searchText.toLowerCase()) ||
      cerda_nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      tipo_carga.toLowerCase().includes(this.searchText.toLowerCase()) ||
      barraco_nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      pacha_nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      fecha_inseminacion.includes(this.searchText) ||
      fecha_confirmacion_carga.includes(this.searchText) ||
      fecha_posible_parto.includes(this.searchText) ||
      fecha_sala_parto.includes(this.searchText) ||
      observaciones.toLowerCase().includes(this.searchText.toLowerCase())
    );
  });
}



get visible() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.filtered.slice(startIndex, endIndex);
}




getClassForCondition(fechaPosibleParto: string): string {
  // Obtenemos la fecha actual y la fecha de fecha_posible_parto como objetos Date
  const fechaActual = new Date();
  const fechaParto = new Date(fechaPosibleParto);

  // Calculamos la diferencia en milisegundos entre las fechas
  const diferenciaEnMilisegundos = fechaParto.getTime() - fechaActual.getTime();

  // Calculamos la diferencia en días
  const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

  // Si la fecha_posible_parto ya pasó, aplicamos la clase 'fecha-pasada' (color gris)
  if (diferenciaEnDias <-1) {
    return 'fecha-pasada';
  }
  // Si falta 1 día para la fecha_posible_parto, aplicamos la clase 'proxima-parto' (color rojo)
  else if (diferenciaEnDias <= 0) {
    return 'proxima-parto';
  }
  // Si faltan 2 a 8 días para la fecha_posible_parto, aplicamos la clase 'dos-dias' (color naranja)
  else if (diferenciaEnDias <= 6) {
    return 'dos-dias';
  }
  // Si faltan 8 a 15 días para la fecha_posible_parto, aplicamos la clase 'ocho-dias' (color zul)
  else if (diferenciaEnDias <= 14) {
    return 'ocho-dias';
  }
  // Si faltan más de 15 días para la fecha_posible_parto, aplicamos la clase 'mas-de-quince-dias' (color verde)
  else {
    return 'mas-de-quince-dias';
  }
}


}
