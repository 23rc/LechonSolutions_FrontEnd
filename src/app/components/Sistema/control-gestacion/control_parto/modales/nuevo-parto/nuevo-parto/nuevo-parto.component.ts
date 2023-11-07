import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartoService } from 'src/app/services/parto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-parto',
  templateUrl: './nuevo-parto.component.html',
  styleUrls: ['./nuevo-parto.component.css']
})
export class NuevoPartoComponent {
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  contenedorDB: any = {};
  isLoading: boolean = true;
  exito: boolean = false;


  partoData: any = {};
  mostrarHoraInicio: boolean = false;
  mostrarHoraFinal: boolean = false;

  parametro: any;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private partoService: PartoService,
  ) {}

  ngOnInit(): void {

    console.log('Datos de contenedorDB al principio:', this.contenedorDB);
     // Aquí puedes acceder al valor de parametro
     console.log('Datos recibidos en el modal parto insertar:', this.parametro);
   
     this.obtenerDatosParto();
  }

  obtenerDatosParto() {
    // Obtén el idCerda y numeroParto que necesitas
    const idCerda = this.parametro.id_cerda; // Supongamos que obtuviste estos valores de alguna manera
  
    // Reemplaza el siguiente valor con el número de parto que deseas obtener
    const numeroParto = this.parametro.numero_partoP;
  
    console.log('ID Cerda:', idCerda);
    console.log('Número de Parto:', numeroParto);
  
    // Realiza una solicitud al servidor para obtener los datos de parto basados en idCerda y numeroParto
    this.http.get(`https://lechonsolutionsbackend-production.up.railway.app/infoparto/info-parto/${idCerda}/${numeroParto}`).subscribe((partoData: any) => {
      // Asigna los datos de parto a la variable partoData
      this.partoData = partoData;
  
      console.log('Datos de partommmmmmmmmmmmmmmmmmmmmmmmmmm:', this.partoData);
  
      
  
  
      console.log('numero_partoP actualizado:', this.partoData.numero_partoP);
    
  
      // Realiza cualquier lógica adicional que necesites con los datos del parto aquí
    });
  }
  insertar() {
    // Crea una nueva variable para consolidar los datos
    const datosAEnviar = {
      numero_parto: this.parametro.numero_partoP,
      id_cerda: this.parametro.id_cerda,
      cerda_nombre: this.parametro.cerda_nombre,
      fecha: this.contenedorDB.fecha,
      peso: this.contenedorDB.peso,
      m_h: this.contenedorDB.m_h,
      estado: this.contenedorDB.estado,
      id_info_parto: this.partoData.id,
      hora_inicio:this.contenedorDB.hora_inicio,
      atendidoPor:this.partoData.atendidoPor,
      hora_final:this.contenedorDB.hora_final,
   


    };
  
    // Agrega un console.log para verificar los datos antes de enviarlos al backend
    console.log('Datos a enviar al backend:', datosAEnviar);

    this.partoService.insert(datosAEnviar).subscribe(
      () => {
        // Proceso exitoso, mostrar mensaje de éxito
        this.toastr.success('Parto insertado con éxito', 'Correcto!!', this.toastrConfigTime);
    
        setTimeout(() => {
          this.activeModal.close('');
        }, 2000);
      },
      (error) => {
        if (error.status === 400) {
          // Mostrar el mensaje de error en Toastr
          this.toastr.error(error.error.error, 'Error', this.toastrConfigTime);
        } else {
          // Manejar otros errores
          this.toastr.error('Error al insertar el parto', 'Incorrecto!!', this.toastrConfigTime);
          console.error('Error al insertar el parto', error);
        }
      }
    );
 }    
  
  toggleHora(tipo: string) {
    if (tipo === 'horaInicio') {
      this.mostrarHoraInicio = !this.mostrarHoraInicio;
      if (this.mostrarHoraInicio) {
        this.contenedorDB.hora_inicio = new Date().toLocaleTimeString();
      } else {
        this.contenedorDB.hora_inicio = null;
      }
    } else if (tipo === 'horaFinal') {
      this.mostrarHoraFinal = !this.mostrarHoraFinal;
      if (this.mostrarHoraFinal) {
        this.contenedorDB.hora_final = new Date().toLocaleTimeString();
      } else {
        this.contenedorDB.hora_final = null;
      }
    }
  }
  toggleHoraInicio() {
    this.mostrarHoraInicio = !this.mostrarHoraInicio;
    
    if (this.mostrarHoraInicio) {
      // Establece la hora de inicio solo cuando se muestra
      this.contenedorDB.hora_inicio = new Date().toLocaleTimeString();
    } else {
      // Limpia el valor cuando se oculta
      this.contenedorDB.hora_inicio = null;
    }
  }

  toggleHoraFinal() {
    this.mostrarHoraFinal = !this.mostrarHoraFinal;

    if (this.mostrarHoraFinal) {
      // Establece la hora final solo cuando se muestra
      this.contenedorDB.hora_final = new Date().toLocaleTimeString();
    } else {
      // Limpia el valor cuando se oculta
      this.contenedorDB.hora_final = null;
    }
  }
  cancelar() {
    // Cierra el modal sin guardar cambios
    this.activeModal.close('Cancelado');
  }
}
