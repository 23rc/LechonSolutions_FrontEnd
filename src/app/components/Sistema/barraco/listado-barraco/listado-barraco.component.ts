import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

import { CrearBarracoComponent  } from '../crear-barraco/crear-barraco.component';
import { EditarBarracoComponent } from '../editar-barraco/editar-barraco.component';
import { BarracoService } from 'src/app/services/barraco.service'; // Importa el nuevo servicio
import { ElementRef } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';


@Component({
  selector: 'app-listado-barraco',
  templateUrl: './listado-barraco.component.html',
  styleUrls: ['./listado-barraco.component.css','./listado-barraco2.component.css','./listado-barraco3.components.css']
})
export class ListadoBarracoComponent {
  
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
    private barracoService: BarracoService,private authService: AuthService, private modalService: NgbModal, private router: Router) {
    this.sortedColumn = 'id'; // Establece la columna inicialmente ordenada
    this.sortDirection = 1; // 1 para ascendente, -1 para descendente (puede ajustarlo según su preferencia)
  }

  ngOnInit(): void {
    this.barracoService.getData().subscribe(data => {
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
  showDeleteConfirmation(contenedorLocal: any) {
    this.ToDelete = contenedorLocal;
    this.showConfirmationModal = true;
  }
  showSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.closeSuccessAlert();
    }, 1000);
  }
  confirmDelete() {
    this.barracoService.delete(this.ToDelete.id).subscribe(
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
  cancelDelete() {
    this.closeDeleteConfirmation();
  }
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
  showModal = false;
  openModal() {
    this.showModal = true;
  }
  openNuevo() {
    const valor = 'Este es un valor de ejemplo';
  
    const modalRef = this.modalService.open(CrearBarracoComponent, {
      size: 'ls', // Cambiar a 'sm' para un modal pequeño
      backdrop: 'static', // Desactiva el efecto de oscurecimiento de fondo
      keyboard: false,
      windowClass: 'modal-vertical-center modal-horizontal-center',
    });
      modalRef.componentInstance.parametro = valor;
      modalRef.result.then(
      (result) => {
             this.refreshList();
      },
      (reason) => {
           }
    );
  }
  

  closeModal() {
    this.showModal = false;
  }
  editar(contenedorLocal: any) {
    console.log('Usuario a editar:', contenedorLocal);
    const id = contenedorLocal.id;
    const modalRef = this.modalService.open(EditarBarracoComponent, {
      size: 'ls',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modal-vertical-center modal-horizontal-center',
    });
      modalRef.componentInstance.usuario = contenedorLocal;
      modalRef.result.then(
      (result) => {
       
        this.refreshList();
      },
      (reason) => {
          }
    );
  }
    refreshList() {
    this.barracoService.getData().subscribe(data => {
      console.log('Datos de usuarios:', data);
      this.contenedorDB = data;
    });
  }
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
get filtered() {
  return this.contenedorDB.filter(contenedorLocal => {
    const id = contenedorLocal.id ? contenedorLocal.id.toString() : '';
    const nombre = contenedorLocal.nombre ? contenedorLocal.nombre.toLowerCase() : '';
    const peso = contenedorLocal.peso ? contenedorLocal.peso.toLowerCase() : '';
    const fechaIngreso = contenedorLocal.fechaIngreso ? contenedorLocal.fechaIngreso.toLowerCase() : '';
    const observacion = contenedorLocal.observacion ? contenedorLocal.observacion.toLowerCase() : '';
    const altura = contenedorLocal.altura ? contenedorLocal.altura.toLowerCase() : '';
    const ubicacion = contenedorLocal.ubicacion ? contenedorLocal.ubicacion.toLowerCase() : '';
    const estadoSalud = contenedorLocal.estadoSalud ? contenedorLocal.estadoSalud.toLowerCase() : '';
    const temperatura = contenedorLocal.temperatura ? contenedorLocal.temperatura.toLowerCase() : '';
    const precio = contenedorLocal.precio ? contenedorLocal.precio.toLowerCase() : '';

    return (
      id.includes(this.searchText.toLowerCase()) ||
      nombre.includes(this.searchText.toLowerCase()) ||
      peso.includes(this.searchText.toLowerCase()) ||
      fechaIngreso.includes(this.searchText.toLowerCase()) ||
      observacion.includes(this.searchText.toLowerCase()) ||
      altura.includes(this.searchText.toLowerCase()) ||
      ubicacion.includes(this.searchText.toLowerCase()) ||
      estadoSalud.includes(this.searchText.toLowerCase()) ||
      temperatura.includes(this.searchText.toLowerCase()) ||
      precio.includes(this.searchText.toLowerCase())
    );
  });
}


get visible() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.filtered.slice(startIndex, endIndex);
}

}
