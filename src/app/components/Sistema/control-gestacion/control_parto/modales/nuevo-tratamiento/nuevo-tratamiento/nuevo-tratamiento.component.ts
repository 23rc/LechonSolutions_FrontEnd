import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-tratamiento',
  templateUrl: './nuevo-tratamiento.component.html',
  styleUrls: ['./nuevo-tratamiento.component.css']
})
export class NuevoTratamientoComponent {
  toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  contenedorDB: any = {};
  isLoading: boolean = true;
  exito: boolean = false;


  partoData: any = {};
  parametro: any;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private tratamientoService: TratamientoService,
  ) {}

  ngOnInit(): void {

    console.log('Datos de contenedorDB al principio:', this.contenedorDB);
     // Aquí puedes acceder al valor de parametro
     console.log('Datos recibidossssss en el modal:', this.parametro);
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
    this.http.get(`http://localhost:3000/infoparto/info-parto/${idCerda}/${numeroParto}`).subscribe((partoData: any) => {
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
      fecha_aplicacion: this.contenedorDB.fecha_aplicacion,
      producto: this.contenedorDB.producto,
      dosis: this.contenedorDB.dosis,
      causa: this.contenedorDB.causa,
      id_info_parto: this.partoData.id
    };
  
    // Agrega un console.log para verificar los datos antes de enviarlos al backend
    console.log('Datos a enviar al backendDDDDDDDDDDDDDDDDDDDDDDDD:', datosAEnviar);

    this.tratamientoService.insert(datosAEnviar).subscribe(
      () => {

        this.toastr.success('Tratamiento insertado con éxito', 'Correcto!!',this.toastrConfigTime);
      
        setTimeout(() => {
          this.activeModal.close('');
        }, 2000);
      },
      (error) => {
        this.toastr.error('Error al insertar el tratamiento', 'Incorrecto!!',this.toastrConfigTime);


        console.error('Error al insertar el tratamiento', error);
      }
    );
  }
  
  cancelar() {
    // Cierra el modal sin guardar cambios
    this.activeModal.close('Cancelado');
  }
}
