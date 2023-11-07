import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';


import { InfoPartoService } from 'src/app/services/infoParto.service'; // Importa el nuevo servicio
import { ElementRef } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
@Component({
  selector: 'app-info-parto',
  templateUrl: './info-parto.component.html',
  styleUrls: ['./info-parto.component.css','./info-parto2.component.css','./info-parto3.component.css']
})
export class InfoPartoComponent {

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
    private infoPartoService: InfoPartoService,private authService: AuthService, private modalService: NgbModal, private router: Router) {
    this.sortedColumn = 'id'; // Establece la columna inicialmente ordenada
    this.sortDirection = 1; // 1 para ascendente, -1 para descendente (puede ajustarlo según su preferencia)
  }

  ngOnInit(): void {
    this.infoPartoService.getData().subscribe(data => {
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
    this.infoPartoService.delete(this.ToDelete.id).subscribe(
      () => {
        this.contenedorDB = this.contenedorDB.filter(u => u.id !== this.ToDelete.id);
        this.toastr.success('Barraco eliminado con éxito', 'Correcto!!', this.toastrConfigTime);
        
        // Ocultar el modal de confirmación después de eliminar
        this.showConfirmationModal = false;
      },
      (error) => {
        console.error('Error al eliminar el barraco', error);
        this.toastr.error('Error al eliminar el barraco', 'Incorrecto!!', this.toastrConfigTime);
   
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
    this.infoPartoService.getData().subscribe(data => {
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
      const valueA = a[column] !== null && a[column] !== undefined ?
        (column === 'id' ? a[column].toString() : a[column].toLowerCase()) :
        ''; // Verifica si el valor de la columna existe
      const valueB = b[column] !== null && b[column] !== undefined ?
        (column === 'id' ? b[column].toString() : b[column].toLowerCase()) :
        ''; // Verifica si el valor de la columna existe
  
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
  return this.contenedorDB.filter(infoParto => {
    // Proceso especial para el campo 'id'
    const id = infoParto.id ? infoParto.id.toString() : '';

    // Procesamiento de otros campos
    const id_control_cerdaP = infoParto.id_control_cerdaP ? infoParto.id_control_cerdaP.toString() : '';
    const id_cerdaP = infoParto.id_cerdaP ? infoParto.id_cerdaP.toString() : '';
    const numero_partoP = infoParto.numero_partoP ? infoParto.numero_partoP.toString() : '';
    const cerda_nombreP = infoParto.cerda_nombreP ? infoParto.cerda_nombreP.toLowerCase() : '';
    const fecha_posible_partoP = infoParto.fecha_posible_partoP ? infoParto.fecha_posible_partoP.toLowerCase() : '';
    const tetasP = infoParto.tetasP ? infoParto.tetasP.toLowerCase() : '';
    const tipo_cargaP = infoParto.tipo_cargaP ? infoParto.tipo_cargaP.toLowerCase() : '';
    const nombre_barracoP = infoParto.nombre_barracoP ? infoParto.nombre_barracoP.toLowerCase() : '';
    const pacha_nombreP = infoParto.pacha_nombreP ? infoParto.pacha_nombreP.toLowerCase() : '';
    const pesoP = infoParto.pesoP ? infoParto.pesoP.toLowerCase() : '';
    const pesoFinalP = infoParto.pesoFinalP ? infoParto.pesoFinalP.toLowerCase() : '';
    const perdidaPesoP = infoParto.perdidaPesoP ? infoParto.perdidaPesoP.toLowerCase() : '';
    const atendidoPor = infoParto.atendidoPor ? infoParto.atendidoPor.toLowerCase() : '';

    // Filtrar por cada campo
    return (
      id.includes(this.searchText.toLowerCase()) ||
      id_control_cerdaP.includes(this.searchText.toLowerCase()) ||
      id_cerdaP.includes(this.searchText.toLowerCase()) ||
      numero_partoP.includes(this.searchText.toLowerCase()) ||
      cerda_nombreP.includes(this.searchText.toLowerCase()) ||
      fecha_posible_partoP.includes(this.searchText.toLowerCase()) ||
      tetasP.includes(this.searchText.toLowerCase()) ||
      tipo_cargaP.includes(this.searchText.toLowerCase()) ||
      nombre_barracoP.includes(this.searchText.toLowerCase()) ||
      pacha_nombreP.includes(this.searchText.toLowerCase()) ||
      pesoP.includes(this.searchText.toLowerCase()) ||
      pesoFinalP.includes(this.searchText.toLowerCase()) ||
      perdidaPesoP.includes(this.searchText.toLowerCase()) ||
      atendidoPor.includes(this.searchText.toLowerCase())
    );
  });
}



get visible() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.filtered.slice(startIndex, endIndex);
}

}
