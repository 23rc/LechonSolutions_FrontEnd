import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ControlCerdaService  } from 'src/app/services/controlCerda.service'; // Importa el nuevo servicio
import { ElementRef } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-pendiente-confirmacion',
  templateUrl: './pendiente-confirmacion.component.html',
  styleUrls: ['./pendiente-confirmacion.component.css','./pendiente-confirmacion2.component.css','./pendiente-confirmacion3.component.css','./pendiente-confirmacion4.component.css']
})
export class PendienteConfirmacionComponent {
  contenedorDB: any[] = [];
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
  


  constructor(
    private toastr: ToastrService,
    private controlCerdaService: ControlCerdaService,private authService: AuthService, private router: Router) {
    this.sortedColumn = 'id'; // Establece la columna inicialmente ordenada
    this.sortDirection = 1; // 1 para ascendente, -1 para descendente (puede ajustarlo según su preferencia)
  }

  ngOnInit(): void {
    this.controlCerdaService.getDataPendienteConfirmacion().subscribe(data => {
      console.log('Datos de usuarios:', data); // Agregar esta línea para verificar los datos
      this.contenedorDB = data;
      
    });
    
  }



  

  nextPage() {
    if (this.currentPage < this.contenedorDB.length / this.pageSize - 1) {
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
    this.controlCerdaService.delete(this.ToDelete.id).subscribe(
      () => {
        this.contenedorDB = this.contenedorDB.filter(u => u.id !== this.ToDelete.id);
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
  showModal = false;

  // Función para abrir el modal
  openModal() {
    this.showModal = true;
  }

  /**APERTURA DEL MODAL NUEVO USUARIO */
 

  closeModal() {
    this.showModal = false;
  }


  refreshList() {
    this.controlCerdaService.getData().subscribe(data => {
      console.log('Datos de usuarios:', data);
      this.contenedorDB = data;
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
  
    this.contenedorDB.sort((a, b) => {
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
  return this.contenedorDB.filter(ContenedorLocal => {
    const id = ContenedorLocal.id ? ContenedorLocal.id.toString() : '';
    const cerda_id = typeof ContenedorLocal.cerda_id === 'number' ? ContenedorLocal.cerda_id.toString() : '';
    const cerdaNombre = typeof ContenedorLocal.cerda_nombre === 'string' ? ContenedorLocal.cerda_nombre.toLowerCase() : '';
    const barraco_id = typeof ContenedorLocal.barraco_id === 'number' ? ContenedorLocal.barraco_id.toString() : '';
    const producto_id = typeof ContenedorLocal.producto_id === 'number' ? ContenedorLocal.producto_id.toString() : '';
    const producto_nombre = typeof ContenedorLocal.producto_nombre === 'string' ? ContenedorLocal.producto_nombre.toLowerCase() : '';
    const barracoNombre = typeof ContenedorLocal.barraco_nombre === 'string' ? ContenedorLocal.barraco_nombre.toLowerCase() : '';
    const tipoCarga = typeof ContenedorLocal.tipo_carga === 'string' ? ContenedorLocal.tipo_carga.toLowerCase() : '';
    const fechaInseminacion = typeof ContenedorLocal.fecha_inseminacion === 'string' ? ContenedorLocal.fecha_inseminacion.toLowerCase() : '';
    const fechaConfirmacionCarga = typeof ContenedorLocal.fecha_confirmacion_carga === 'string' ? ContenedorLocal.fecha_confirmacion_carga.toLowerCase() : '';
    const confirmar_carga = typeof ContenedorLocal.confirmar_carga === 'string' ? ContenedorLocal.confirmar_carga.toLowerCase() : '';
    const observaciones = typeof ContenedorLocal.observaciones === 'string' ? ContenedorLocal.observaciones.toLowerCase() : '';

    return (
      id.includes(this.searchText.toLowerCase()) ||
      cerda_id.includes(this.searchText) ||  // No es necesario convertir a minúsculas
      cerdaNombre.includes(this.searchText.toLowerCase()) ||
      barraco_id.includes(this.searchText) ||  // No es necesario convertir a minúsculas
      barracoNombre.includes(this.searchText.toLowerCase()) ||
      producto_id.includes(this.searchText) ||  // No es necesario convertir a minúsculas
      producto_nombre.includes(this.searchText.toLowerCase()) ||
      tipoCarga.includes(this.searchText.toLowerCase()) ||
      fechaInseminacion.includes(this.searchText.toLowerCase()) ||
      fechaConfirmacionCarga.includes(this.searchText.toLowerCase()) ||
      confirmar_carga.includes(this.searchText.toLowerCase()) ||
      observaciones.includes(this.searchText.toLowerCase())
    );
  });
}



get visible() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.filtered.slice(startIndex, endIndex);
}
getClassForCondition(fechaConfirmacionCarga: string): string {
  // Obtenemos la fecha actual y la fecha de fecha_confirmacion_carga como objetos Date
  const fechaActual = new Date();
  const fechaConfirmacion = new Date(fechaConfirmacionCarga);

  // Calculamos la diferencia en milisegundos entre las fechas
  const diferenciaEnMilisegundos = fechaConfirmacion.getTime() - fechaActual.getTime();

  // Calculamos la diferencia en días
  const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

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
