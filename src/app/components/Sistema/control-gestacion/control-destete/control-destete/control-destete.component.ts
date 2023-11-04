import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';


import { DesteteService } from 'src/app/services/destete.service'; // Importa el nuevo servicio
import { CamadaLechonesService } from 'src/app/services/camadaLechones'; // Importa el nuevo servicio
import { ElementRef } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';


@Component({
  selector: 'app-control-destete',
  templateUrl: './control-destete.component.html',
  styleUrls: ['./control-destete.component.css']
})
export class ControlDesteteComponent {
  contenedorDB: any[] = [];
  camadaLechones: any[] = [];
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
    private desteteService: DesteteService,
    private camadaLechonesService: CamadaLechonesService,private authService: AuthService, private modalService: NgbModal, private router: Router) {
    this.sortedColumn = 'id'; // Establece la columna inicialmente ordenada
    this.sortDirection = 1; // 1 para ascendente, -1 para descendente (puede ajustarlo según su preferencia)
  }

  ngOnInit(): void {
    this.desteteService.getData().subscribe(data => {
      console.log('Datos de usuarios:', data); // Agregar esta línea para verificar los datos
      this.contenedorDB = data;
    });
    
  }
   cargarCamadaLechones() {
    // Supongamos que tienes un servicio que obtiene los datos de camadaLechones.
    this.desteteService.getData().subscribe((datos) => {
      this.contenedorDB = datos;
    });
  }
  cargarLechones(contenedorLocal: any) {
    console.log('Estado:', contenedorLocal.estado); // Agregar esta línea para ver el valor de estado
    if (contenedorLocal.estado === "Cargado") {
      this.toastr.error('Este camada ya ha sido cargada', 'Error');
    } else {
      const nuevoRegistro = {
        id_destete: contenedorLocal.id,
        id_cerda: contenedorLocal.id_cerda,
        numero_parto: contenedorLocal.numero_parto,
        cerda_nombre: contenedorLocal.cerda_nombre,
        tip_carga: contenedorLocal.tipo_carga,
        barraco_nombre: contenedorLocal.barraco_nombre,
        pacha_nombre: contenedorLocal.pacha_nombre,
        fecha_parto: contenedorLocal.fecha_parto,
        lechones: contenedorLocal.cantidad_destetar,
      };
  
      this.camadaLechonesService.insert(nuevoRegistro).subscribe(
        () => {
          this.toastr.success('Lechones cargados con éxito', 'Éxito');
          this.cargarCamadaLechones();
        },
        (error) => {
          this.toastr.error('Ocurrió un error al cargar los lechones', 'Error');
          console.error('Error:', error); // Puedes mostrar el error en la consola para depuración.
        }
      );
    }
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

  confirmDelete() {
    if (this.ToDelete && this.ToDelete.estado === "Cargado") {
      // El registro tiene el estado "Cargado", no permitas la eliminación
      this.toastr.error('Este registro ya se encuentra cargado y no se puede eliminar', 'Error', this.toastrConfigTime);
      this.showConfirmationModal = false;
    } else if (this.ToDelete) {
      // El registro tiene otro estado, procede con la eliminación
      this.desteteService.delete(this.ToDelete.id).subscribe(
        () => {
          this.contenedorDB = this.contenedorDB.filter(u => u.id !== this.ToDelete.id);
          this.toastr.success('Destete eliminado con éxito', 'Correcto!!', this.toastrConfigTime);
          
          // Ocultar el modal de confirmación después de eliminar
          this.showConfirmationModal = false;
        },
        (error) => {
          console.error('Error al eliminar el destete', error);
          this.toastr.error('Error al eliminar el destete', 'Incorrecto!!', this.toastrConfigTime);
          // Ocultar el modal en caso de error
          this.showConfirmationModal = false;
        }
      );
    }
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
  openNuevo() {
    const valor = 'Este es un valor de ejemplo';
  
    const modalRef = this.modalService.open( {
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

  editar(contenedorLocal: any) {
    console.log('Usuario a editar:', contenedorLocal);
    const id = contenedorLocal.id;
    const modalRef = this.modalService.open( {
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
    this.desteteService.getData().subscribe(data => {
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
  return this.contenedorDB.filter(contenedorLocal => {
    const id = contenedorLocal.id ? contenedorLocal.id.toString() : '';
    const cerda_nombre = contenedorLocal.cerda_nombre ? contenedorLocal.cerda_nombre.toLowerCase() : '';
    const tipo_carga = contenedorLocal.tipo_carga ? contenedorLocal.tipo_carga.toLowerCase() : '';
    const barraco_nombre = contenedorLocal.barraco_nombre ? contenedorLocal.barraco_nombre.toLowerCase() : '';
    const pacha_nombre = contenedorLocal.pacha_nombre ? contenedorLocal.pacha_nombre.toLowerCase() : '';
    const fecha_parto = contenedorLocal.fecha_parto ? contenedorLocal.fecha_parto.toLowerCase() : '';
    const fecha_destete = contenedorLocal.fecha_destete ? contenedorLocal.fecha_destete.toLowerCase() : '';
    const cantidad_destetar = contenedorLocal.cantidad_destetar ? contenedorLocal.cantidad_destetar.toString() : '';
    const atendidoPor = contenedorLocal.atendidoPor ? contenedorLocal.atendidoPor.toLowerCase() : '';
    const estado = contenedorLocal.estado ? contenedorLocal.estado.toLowerCase() : '';

    return (
      id.includes(this.searchText.toLowerCase()) ||
      cerda_nombre.includes(this.searchText.toLowerCase()) ||
      tipo_carga.includes(this.searchText.toLowerCase()) ||
      barraco_nombre.includes(this.searchText.toLowerCase()) ||
      pacha_nombre.includes(this.searchText.toLowerCase()) ||
      fecha_parto.includes(this.searchText.toLowerCase()) ||
      fecha_destete.includes(this.searchText.toLowerCase()) ||
      cantidad_destetar.includes(this.searchText.toLowerCase()) ||
      atendidoPor.includes(this.searchText.toLowerCase()) ||
      estado.includes(this.searchText.toLowerCase())
    );
  });
}


get visible() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.filtered.slice(startIndex, endIndex);
}

}
