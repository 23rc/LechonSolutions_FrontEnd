import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

import { CrearPachaComponent  } from '../crear-pacha/crear-pacha.component';
import { EditarPachaComponent } from '../editar-pacha/editar-pacha.component';
import { PachaService } from 'src/app/services/pacha.service'; // Importa el nuevo servicio
import { ElementRef } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-listado-pacha',
  templateUrl: './listado-pacha.component.html',
  styleUrls: ['./listado-pacha.component.css']
})
export class ListadoPachaComponent {
  contenedorDB: any[] = [];
  usuarios: any[] = [];
  pageSize: number = 10; // Cantidad de registros por página
  currentPage: number = 0; // Página actual
  showConfirmationModal: boolean = false;
  ToDelete: any = null; // Almacena el usuario a eliminar
  showSuccessModal: boolean = false;
  sortedColumn: string | null = null; // Columna actualmente ordenada
  sortDirection: number = 1; // 1 para ascendente, -1 para descendente
  searchText: string = ''; // Texto de búsqueda
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  


  constructor(
    private toastr: ToastrService,
    private pachaService: PachaService,private authService: AuthService, private modalService: NgbModal, private router: Router) {
    this.sortedColumn = 'id'; // Establece la columna inicialmente ordenada
    this.sortDirection = 1; // 1 para ascendente, -1 para descendente (puede ajustarlo según su preferencia)
  }

  ngOnInit(): void {
    this.pachaService.getData().subscribe(data => {
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


  // Función para confirmar la eliminación
  confirmDelete() {
    this.pachaService.delete(this.ToDelete.id).subscribe(
      () => {
        this.contenedorDB = this.contenedorDB.filter(u => u.id !== this.ToDelete.id);
        this.toastr.success('Pacha eliminado con éxito', 'Correcto!!', this.toastrConfigTime);
        // Ocultar el modal de confirmación después de eliminar
        this.showConfirmationModal = false;
      },
      (error) => {
        console.error('Error al eliminar el pacha', error);
        this.toastr.error('Error al eliminar la pacha', 'Incorrecto!!', this.toastrConfigTime);
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


  // Agrega una propiedad para controlar la visibilidad del modal
  showModal = false;

  // Función para abrir el modal
  openModal() {
    this.showModal = true;
  }

  /**APERTURA DEL MODAL NUEVO USUARIO */
  openNuevo() {
    const valor = 'Este es un valor de ejemplo';
  
    const modalRef = this.modalService.open(CrearPachaComponent, {
      size: 'ls',
      backdrop: 'static',
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

  editar(contenedorLocal: any) {
    console.log('Usuario a editar:', contenedorLocal);
    const id = contenedorLocal.id;
    const modalRef = this.modalService.open(EditarPachaComponent, {
      size: 'ls',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modal-vertical-center modal-horizontal-center',
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
    this.pachaService.getData().subscribe(data => {
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
        (column === 'id' ? a[column].toString() : (typeof a[column] === 'string' ? a[column].toLowerCase() : a[column])) :
        ''; // Verifica si el valor de la columna existe
      const valueB = b[column] !== null && b[column] !== undefined ?
        (column === 'id' ? b[column].toString() : (typeof b[column] === 'string' ? b[column].toLowerCase() : b[column])) :
        ''; // Verifica si el valor de la columna existe
  
      if (column === 'id') {
        // Si es la columna de ID, compara como números
        return (Number(valueA) - Number(valueB)) * this.sortDirection;
      } else {
        // Para otras columnas, compara como cadenas de texto en minúsculas
        return String(valueA).localeCompare(String(valueB)) * this.sortDirection;
      }
    });
  }
  
  
  

// Función para filtrar usuarios por búsqueda
get filtered() {
  return this.contenedorDB.filter(contenedorLocal => {
    const id = contenedorLocal.id ? contenedorLocal.id.toString() : '';
    const nombre = contenedorLocal.nombre ? contenedorLocal.nombre.toLowerCase() : '';
    const fechaIngreso = contenedorLocal.fechaIngreso ? contenedorLocal.fechaIngreso.toLowerCase() : '';
    const fechaVencimiento = contenedorLocal.fechaVencimiento ? contenedorLocal.fechaVencimiento.toLowerCase() : '';
    const observacion = contenedorLocal.observacion ? contenedorLocal.observacion.toLowerCase() : '';
    const origenGenetico = contenedorLocal.origenGenetico ? contenedorLocal.origenGenetico.toLowerCase() : '';
    const lote = contenedorLocal.lote ? contenedorLocal.lote.toLowerCase() : '';
    const cantidad = contenedorLocal.cantidad ? contenedorLocal.cantidad.toString() : '';
    const calidad = contenedorLocal.calidad ? contenedorLocal.calidad.toLowerCase() : '';
    const temperaturaAlmacenamiento = contenedorLocal.temperaturaAlmacenamiento ? contenedorLocal.temperaturaAlmacenamiento.toLowerCase() : '';

    return (
      id.includes(this.searchText.toLowerCase()) ||
      nombre.includes(this.searchText.toLowerCase()) ||
      fechaIngreso.includes(this.searchText.toLowerCase()) ||
      fechaVencimiento.includes(this.searchText.toLowerCase()) ||
      observacion.includes(this.searchText.toLowerCase()) ||
      origenGenetico.includes(this.searchText.toLowerCase()) ||
      lote.includes(this.searchText.toLowerCase()) ||
      cantidad.includes(this.searchText.toLowerCase()) ||
      calidad.includes(this.searchText.toLowerCase()) ||
      temperaturaAlmacenamiento.includes(this.searchText.toLowerCase())
    );
  });
}




get visible() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.filtered.slice(startIndex, endIndex);
}

}
