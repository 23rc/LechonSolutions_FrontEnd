import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { ControlPartoService  } from 'src/app/services/controlParto.service'; // Importa el nuevo servicio
import { ElementRef } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-fecha-partos',
  templateUrl: './fecha-partos.component.html',
  styleUrls: ['./fecha-partos.component.css','./fecha-partos2.component.css','./fecha-partos3.component.css','./fecha-partos4.component.css']
})
export class FechaPartosComponent {
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
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private controlPartoService: ControlPartoService,
    private authService: AuthService,
     private modalService: NgbModal,
      private router: Router) {

  }

  


  ngOnInit(): void {
    this.controlPartoService.getData().subscribe(data => {
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
    this.controlPartoService.delete(this.ToDelete.id).subscribe(
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
    this.controlPartoService.getData().subscribe(data => {
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
