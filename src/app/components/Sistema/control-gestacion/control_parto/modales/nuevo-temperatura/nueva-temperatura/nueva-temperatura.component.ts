import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemperaturaService } from 'src/app/services/temperatura.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal para controlar el modal
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nueva-temperatura',
  templateUrl: './nueva-temperatura.component.html',
  styleUrls: ['./nueva-temperatura.component.css']
})
export class NuevaTemperaturaComponent {
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
    private temperaturaService: TemperaturaService,
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
      numero_partoT: this.parametro.numero_partoP,
      id_cerdaT: this.parametro.id_cerda,
      cerda_nombreT: this.parametro.cerda_nombre,
      fechaT: this.contenedorDB.fechaT,
      temperaturaT: this.contenedorDB.temperaturaT,
      horaT: this.contenedorDB.horaT,
      observacionT: this.contenedorDB.observacionT,
      id_info_partoT: this.partoData.id
    };
  
    // Agrega un console.log para verificar los datos antes de enviarlos al backend
    console.log('Datos a enviar al backend:', datosAEnviar);

    this.temperaturaService.insert(datosAEnviar).subscribe(
      () => {

        this.toastr.success('Temperatura insertado con éxito', 'Correcto!!',this.toastrConfigTime);
      
        setTimeout(() => {
          this.activeModal.close('');
        }, 2000);
      },
      (error) => {
        this.toastr.error('Error al insertar el temperatura', 'Incorrecto!!',this.toastrConfigTime);


        console.error('Error al insertar el tratamiento', error);
      }
    );
  }
  
  cancelar() {
    // Cierra el modal sin guardar cambios
    this.activeModal.close('Cancelado');
  }
}
