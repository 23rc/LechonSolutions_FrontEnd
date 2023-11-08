import { Component, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css','./crear-usuario2.component.css']
})
export class CrearUsuarioComponent implements OnInit{

  public imagenArchivo: string = '';
  showSuccessAlert = false;
  showErrorAlert = false;
  showValidationAlert = false;
  validationMessage = '';
  successMessage = '';
  errorMessage = '';
  defaultImageUrl = '/assets/usuario.ico';
  
  
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos

  contenedorDB: any = {
    nombres: '',
    apellidos: '',
    usuario: '',
    rol: '',
    pass: '',
    correo: '',
    fechaRegistro: '',
    ultimoInicioSesion: null,
    telefono: '',
    imagenPerfil: null,
    estadoCuenta: '', // Puedes establecer un valor predeterminado aquí
    consulta: '', // Agrega estos campos con los valores por defecto que desees
    registro: false,
    reportes: false,
    inventario: false,
    control: false,
    usuarios: false,
  };
  
  
  constructor(private sanitizer: DomSanitizer,private toastr: ToastrService,private usuarioService: UsuarioService, public activeModal: NgbActiveModal) {}

  ngOnInit() {
    // Establece la fecha de hoy en formato ISO (YYYY-MM-DD)
    const fechaHoy = new Date().toISOString().slice(0, 10);
    this.contenedorDB.fechaRegistro = fechaHoy;
    this.imagenArchivo = this.defaultImageUrl;
  }
  formatRolInput() {
    this.contenedorDB.rol = this.contenedorDB.rol.charAt(0).toUpperCase() + this.contenedorDB.rol.slice(1).toLowerCase();
  }

  insertar() {
    this.resetValidationAlert();
    this.closeSuccessAlert();
    this.closeErrorAlert();

  
    // Verifica si la variable imagenArchivo tiene un valor
    if (this.imagenArchivo) {
      // Asigna el valor de imagenArchivo a imagenPerfil
      this.contenedorDB.imagenPerfil = this.imagenArchivo;
    }
    console.log('Datos enviados desde el formulario HTML:');
    console.log(this.contenedorDB);
  
    this.contenedorDB.consulta = this.contenedorDB.consulta ? 'Si' : 'No';
    this.contenedorDB.registro = this.contenedorDB.registro ? 'Si' : 'No';
    this.contenedorDB.reportes = this.contenedorDB.reportes ? 'Si' : 'No';
    this.contenedorDB.inventario = this.contenedorDB.inventario ? 'Si' : 'No';
    this.contenedorDB.control = this.contenedorDB.control ? 'Si' : 'No';
    this.contenedorDB.usuarios = this.contenedorDB.usuarios ? 'Si' : 'No';
  
    // Mostrar el JSON antes de enviarlo al backend
    console.log('JSON que se enviará al backend:');
    console.log(this.contenedorDB);
  
    this.usuarioService.insert(this.contenedorDB).subscribe(
      () => {
        console.log('Datos enviados al backend:');
        console.log(this.contenedorDB);
        this.toastr.success('Usuario insertado con éxito', 'Correcto!!',this.toastrConfigTime);
        setTimeout(() => {
          this.activeModal.close('');
        }, 2000);
      },
  
      (error) => {
        this.toastr.error('Error al insertar el usuario', 'Incorrecto!!',this.toastrConfigTime);
        console.error('Error al insertar el usuario', error);
      }
    );
  }
  
  
  
 

  closeValidationAlert() {
    this.showValidationAlert = false;
  }

  closeSuccessAlert() {
    this.showSuccessAlert = false;
    this.successMessage = '';
  }

  closeErrorAlert() {
    this.showErrorAlert = false;
    this.errorMessage = '';
  }

  resetValidationAlert() {
    this.showValidationAlert = false;
    this.validationMessage = '';
  }

  cancelar() {
    this.activeModal.dismiss('cancelar');
  }

}



