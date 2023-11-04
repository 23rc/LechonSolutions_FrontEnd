import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Compressor from 'compressorjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  id: number | undefined;
  usuario: any = {};
  isLoading: boolean = true;
  exito: boolean = false;
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  defaultImageUrl = '/assets/usuario.ico';
  constructor(
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,

  ) {}


  ngOnInit(): void {

 }
  formatRolInput() {
    if (!this.usuario.imagenPerfil) {
      this.usuario.imagenPerfil = this.defaultImageUrl;
    }
  }
  guardarCambios() {

    if (!this.usuario.imagenPerfil) {
      // Asigna la imagen por defecto a this.usuario.imagenPerfil
      this.usuario.imagenPerfil = this.defaultImageUrl;
    }
    // Utiliza el servicio usuarioService para enviar los cambios al servidor
    // Crea un objeto similar al que se envía en la función de insertar, excluyendo 'pass'
    const usuarioEditado = {
      nombres: this.usuario.nombres,
      apellidos: this.usuario.apellidos,
      usuario: this.usuario.usuario,
      rol: this.usuario.rol,
      correo: this.usuario.correo,
      fechaRegistro: this.usuario.fechaRegistro,
      telefono: this.usuario.telefono,
      imagenPerfil: this.usuario.imagenPerfil,
      estadoCuenta: this.usuario.estadoCuenta,
      consulta: this.usuario.consulta ? 'Si' : 'No',
      registro: this.usuario.registro ? 'Si' : 'No',
      reportes: this.usuario.reportes ? 'Si' : 'No',
      inventario: this.usuario.inventario ? 'Si' : 'No',
      control: this.usuario.control ? 'Si' : 'No',
      usuarios: this.usuario.usuarios ? 'Si' : 'No',
    };
    console.log('Datos del usuario antes de guardar los cambios:', this.usuario);

  
    this.usuarioService.editar(this.usuario.id, usuarioEditado).subscribe(
      (response) => {
        // Manejar la respuesta exitosa del servidor, si es necesario
        
        console.log('Usuario actualizado exitosamente:', response);
  
        // Muestra el mensaje de éxito y cierra el modal
        this.exito = true;
        this.toastr.success('Usuario actualizado con éxito', 'Correcto!!',this.toastrConfigTime);
        // Cierra el modal después de 2 segundos (puedes ajustar el tiempo)
        setTimeout(() => {
          // Llama a refreshUserList para actualizar la lista de usuarios en el componente de lista
          this.activeModal.close('');
        }, 2000);
      },
      (error) => {
        // Manejar errores en caso de que la actualización falle
        this.toastr.error('Error al actualizar el usuario', 'Incorrecto!!',this.toastrConfigTime);
        console.error('Error al actualizar el usuario:', error);
      }
    );

  }
  

  cancelar() {
    // Cierra el modal sin guardar cambios
   

      // Llama a refreshUserList para actualizar la lista de usuarios en el componente de lista
      this.activeModal.close('Cancelado');
   
  }
  onImageEdit(event: any) {
    const file = event.target.files[0]; // Obtener el archivo seleccionado


    const options = {
      maxWidth: 70, // Ancho máximo deseado en píxeles
      maxHeight: 700, // Altura máxima deseada en píxeles
      quality: 0.3, // Calidad de compresión (entre 0 y 1)
      mimeType: 'auto', // Tipo de imagen de salida (auto selecciona automáticamente)
      size: 2000, // Tamaño máximo en bytes después de la compresión (4000 bytes en este caso)
    };
  

    
    // Utilizamos la biblioteca Compressor para comprimir la imagen
    new Compressor(file, {
      ...options,
      success: (result) => {
        console.log('Tamaño antes de la compresión:', file.size, 'bytes');
        console.log('Tamaño después de la compresión:', result.size, 'bytes');
  
        const reader = new FileReader();
  
        // Cuando la lectura del archivo se complete, e.target.result contendrá la imagen comprimida en base64
        reader.onload = (e: any) => {
          // Asignamos la imagen comprimida al atributo 'imagenPerfil' del modelo de usuario
          this.usuario.imagenPerfil = e.target.result;
        };
  
        // Leemos la imagen comprimida como URL en formato base64
        reader.readAsDataURL(result);
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
  
  sanitizeImage(imageUrl: string): SafeUrl {
    // Utiliza DomSanitizer para sanear la URL
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }


}
