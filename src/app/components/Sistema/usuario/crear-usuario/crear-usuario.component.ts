import { Component, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import Compressor from 'compressorjs';
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
  
    if (
      !this.contenedorDB.nombres ||
      !this.contenedorDB.apellidos ||
      !this.contenedorDB.usuario ||
      !this.contenedorDB.rol ||
      !this.contenedorDB.pass ||
      !this.contenedorDB.correo ||
      !this.contenedorDB.fechaRegistro ||
      !this.contenedorDB.telefono ||
      !this.contenedorDB.estadoCuenta
    ) {
      this.toastr.warning('Por favor, completa todos los campos', 'Advertencia',this.toastrConfigTime);
      return;
    }
  
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


  onImageChange(event: any) {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
  
    const options = {
      maxWidth: 70, // Ancho máximo deseado en píxeles
      maxHeight: 700, // Altura máxima deseada en píxeles
      quality: 0.3, // Calidad de compresión (entre 0 y 1)
      mimeType: 'auto', // Tipo de imagen de salida (auto selecciona automáticamente)
      size: 2000, // Tamaño máximo en bytes después de la compresión (4000 bytes en este caso)
    };
  
    if (file) {
    new Compressor(file, {
      ...options,
      success: (result) => {
        // Aquí puedes agregar mensajes de consola para verificar el tamaño final
        console.log('Tamaño antes de la compresión:', file.size, 'bytes');
        console.log('Tamaño después de la compresión:', result.size, 'bytes');
  
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // Cuando la lectura del archivo se complete, e.target.result contendrá la imagen en base64
          this.imagenArchivo = e.target.result;
        };
  
        // Leer el archivo comprimido como URL en formato base64
        reader.readAsDataURL(result);
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }else {
    // Si el usuario no seleccionó ninguna imagen, no necesitas hacer ninguna asignación
    // La imagen por defecto ya está cargada en this.imagenArchivo
  }
}
  sanitizeImage(imageUrl: string): SafeUrl {
    // Utiliza DomSanitizer para sanear la URL
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  
}



