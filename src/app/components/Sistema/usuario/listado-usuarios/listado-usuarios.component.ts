import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';

import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { HistorialComponent } from '../historial/historial.component';
import { ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HistorialSesionService } from 'src/app/services/historialSesion.service'; // Importa el servicio
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog'; // Asegúrate de importar MatDialog

import { MatButtonModule } from '@angular/material/button'; // Importa los componentes de Material que necesitas
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService, IndividualConfig } from 'ngx-toastr';


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})

export class ListadoUsuariosComponent {
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
  selectedUser: any = null;

  historial: any[] = []; // Variable para almacenar el historial de sesiones
  showHistorialModal: boolean = false; // Variable para mostrar/ocultar el modal de historial
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos

  
  constructor(private dialog: MatDialog,
    private modalService: NgbModal, 
    private sanitizer: DomSanitizer,
    private historialSesion:HistorialSesionService,
    private usuarioService: UsuarioService,
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService) {
    this.sortedColumn = 'id'; // Establece la columna inicialmente ordenada
    this.sortDirection = 1; // 1 para ascendente, -1 para descendente (puede ajustarlo según su preferencia)
  }

  ngOnInit(): void {
    this.usuarioService.getData().subscribe(data => {
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
    this.usuarioService.delete(this.ToDelete.id).subscribe(
      () => {
        this.contenedorDB = this.contenedorDB.filter(u => u.id !== this.ToDelete.id);
        this.toastr.success('Usuario eliminado con éxito', 'Correcto!!', this.toastrConfigTime);
       
        // Ocultar el modal de confirmación después de eliminar
        this.showConfirmationModal = false;
      },
      (error) => {
        console.error('Error al eliminar el usuario', error);
        this.toastr.error('Error al eliminar el usuario', 'Incorrecto!!', this.toastrConfigTime);

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
  
    const modalRef = this.modalService.open(CrearUsuarioComponent, {
      size: 'lg', // Cambiar a 'sm' para un modal pequeño
      backdrop: 'static', // Desactiva el efecto de oscurecimiento de fondo
      keyboard: false,
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
    console.log('ID de usuario a editar:', id);
  
    // Realiza una consulta para obtener los permisos del usuario
    this.usuarioService.obtenerPermisosPorUsuario(id).subscribe((permisos) => {
      // Asigna los permisos individualmente al objeto contenedorLocal
      contenedorLocal.consulta = permisos.consulta;
      contenedorLocal.registro = permisos.registro;
      contenedorLocal.reportes = permisos.reportes;
      contenedorLocal.inventario = permisos.inventario;
      contenedorLocal.control = permisos.control;
      contenedorLocal.usuarios = permisos.usuarios;
  
      // Abre el modal de edición con los datos actualizados
      const modalRef = this.modalService.open(EditarUsuarioComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
      });
  

      modalRef.componentInstance.usuario = contenedorLocal;
      console.log('Datos del usuario que se pasan al componente EditarUsuarioComponent:', contenedorLocal);
      modalRef.result.then(
        (result) => {
          // El modal se cerró con éxito, ahora actualiza la lista de usuarios
          this.refreshList();
        },
        (reason) => {
          // El modal se cerró sin éxito o el usuario canceló, puedes manejarlo aquí si es necesario
        }
      );
    });
  }
  
  

  refreshList() {
    this.usuarioService.getData().subscribe(data => {
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
    const id = contenedorLocal.id ? contenedorLocal.id.toString() : ''; // Verifica si id existe
    const nombres = contenedorLocal.nombres ? contenedorLocal.nombres.toLowerCase() : ''; // Verifica si nombres existe
    const apellidos = contenedorLocal.apellidos ? contenedorLocal.apellidos.toLowerCase() : ''; // Verifica si apellidos existe
    const usuario = contenedorLocal.usuario ? contenedorLocal.usuario.toLowerCase() : ''; // Verifica si usuario existe
    const rol = contenedorLocal.rol ? contenedorLocal.rol.toLowerCase() : ''; // Verifica si rol existe
    const correo = contenedorLocal.correo ? contenedorLocal.correo.toLowerCase() : ''; // Verifica si correo existe
    const fechaRegistro = contenedorLocal.fechaRegistro ? contenedorLocal.fechaRegistro.toLowerCase() : ''; // Verifica si fechaRegistro existe
    const ultimoInicioSesion = contenedorLocal.ultimoInicioSesion ? contenedorLocal.ultimoInicioSesion.toLowerCase() : ''; // Verifica si ultimoInicioSesion existe
    const telefono = contenedorLocal.telefono ? contenedorLocal.telefono.toString() : ''; // Verifica si telefono existe
    const estadoCuenta = contenedorLocal.estadoCuenta ? contenedorLocal.estadoCuenta.toLowerCase() : ''; // Verifica si estadoCuenta existe

    // Realiza la búsqueda en todas las propiedades
    return (
      id.includes(this.searchText.toLowerCase()) ||
      nombres.includes(this.searchText.toLowerCase()) ||
      apellidos.includes(this.searchText.toLowerCase()) ||
      usuario.includes(this.searchText.toLowerCase()) ||
      rol.includes(this.searchText.toLowerCase()) ||
      correo.includes(this.searchText.toLowerCase()) ||
      fechaRegistro.includes(this.searchText.toLowerCase()) ||
      ultimoInicioSesion.includes(this.searchText.toLowerCase()) ||
      telefono.includes(this.searchText.toLowerCase()) ||
      estadoCuenta.includes(this.searchText.toLowerCase())
    );
  });
}






get visible() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.filtered.slice(startIndex, endIndex);
}

sanitizeImage(imageUrl: string): SafeUrl {
  // Utiliza DomSanitizer para sanear la URL
  return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

openHistorialModal(userId: number) {
  console.log('Abriendo modal para el usuario con ID:', userId);
  // Lógica para obtener el historial de sesiones
  this.historialSesion.obtenerHistorialDeSesionPorUsuario(userId).subscribe((historial) => {
    console.log('Historial de sesiones obtenido:', historial);
    // Abre el modal y pasa los datos al componente Historial
    const dialogRef = this.dialog.open(HistorialComponent, {
      data: { historial }, // Pasa el historial como dato al componente Historial
      width: '600px' // Personaliza el ancho del modal según tus necesidades
    });
  });
}
}
//console.log('Abriendo modal para el usuario con ID:', userId);
//onsole.log('Historial de sesiones obtenido:', historial);