import { Component,OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service'; // Importa el servicio de autenticación
import { ListadoUsuariosComponent } from '../usuario/listado-usuarios/listado-usuarios.component';
import { ListadoBarracoComponent } from '../barraco/listado-barraco/listado-barraco.component';
import { ListadoCerdaComponent } from '../cerda/listado-cerda/listado-cerda.component';
import { ListadoClienteComponent } from '../inventario/listado-cliente/listado-cliente.component';
import { VentasComponent } from '../inventario/ventas/ventas.component';
import { CompraComponent  } from '../compras/compra/compra.component';
import { ProductoComponent } from '../compras/producto/producto.component';
import { ProveedoresComponent } from '../compras/proveedores/proveedores.component';
import { FacturacionCComponent } from '../compras/facturacion-c/facturacion-c.component';
import { ListadoPachaComponent } from '../pacha/listado-pacha/listado-pacha.component';
import { ControlDesteteComponent } from '../control-gestacion/control-destete/control-destete/control-destete.component';
import { ControlCerdaComponent } from '../control-gestacion/control_cerdas/control-cerda/control-cerda.component';
import { CamadaLechonesComponent } from '../inventario/camada-lechones/camada-lechones.component';
import { ControlPartoComponent } from '../control-gestacion/control_parto/control-parto/control-parto.component';
import { InfoPartoComponent } from '../control-gestacion/control_parto/info-parto/info-parto.component';
import { PendienteConfirmacionComponent} from '../reportes/pendiente-confirmacion/pendiente-confirmacion.component';
import { ReportesventasComponent} from '../reportes/reportesventas/reportesventas.component';

import { ReportescomprasComponent} from '../reportes/reportescompras/reportescompras.component';
import {  FechaPartosComponent } from '../reportes/fecha-partos/fecha-partos.component';
import { FacturacionComponent } from '../inventario/facturacion/facturacion.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import jwt_decode, { JwtPayload } from 'jwt-decode'; // Importa jwt_decode y JwtPayload


interface MyToken extends JwtPayload {
  // Define aquí cualquier propiedad adicional que esperes en tu token
  // Por ejemplo, si tu token tiene un campo 'userId', puedes incluirlo aquí:
  userId: string;
}

import 'chart.js/auto';
 
@Component({
  selector: 'app-ingreso-al-sistema',
  templateUrl: './ingreso-al-sistema.component.html',
  styleUrls: ['./ingreso-al-sistema.component.css']
})
export class IngresoAlSistemaComponent implements OnInit{
  permisos: any = {}; // Esta propiedad almacenará los permisos

  showChart: boolean = true;
  userData: any[] = [];
  chart: any;
  usuario: any = {};
  contenedorDB: any[] = [];
  isConsultaOpen=false;
  isRegistroOpen = false;
  isInventarioOpen = false;
  isVentasOpen=false;
  isGestacionOpen=false;
  isUsuarioOpen = false;
  nombresUsuario: string = '';
  apellidosUsuario: string = '';
  rolUsuario: string = ''; // Agrega una propiedad para el rol
  imagenPerfil: string = '';
  mensajeReproducido = false;



  constructor(
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private usuarioService: UsuarioService, // Inyecta el servicio de autenticación

  ) {}

 
  ngOnInit():void {
    this.http.get('http://localhost:3000/user/userStatusData').subscribe((data: any) => { // Cambia "data: any[]" a "data: any"
      this.userData = data;
      this.createChart();

   

    });
    

    this.imagenPerfil = this.usuarioService.getNameAndRole().imagenPerfil;
    console.log('Imagen de perfil en base64:', this.imagenPerfil);
    // Obtén el nombre y el rol del usuario desde el token


// Verifica si el mensaje ya se ha reproducido durante esta sesión
/*
if (!sessionStorage.getItem('mensajeReproducido')) {
  const { nombres, apellidos, rol } = this.usuarioService.getNameAndRole();
  this.nombresUsuario = nombres;
  this.apellidosUsuario = apellidos;
  this.rolUsuario = rol;

  const mensajeBienvenida = `Bienvenido, ${this.nombresUsuario} ${this.apellidosUsuario},  Es un gusto tenerte aquí`;

  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;
    const mensaje = new SpeechSynthesisUtterance(mensajeBienvenida);
    synth.speak(mensaje);
  }

  // Establece un registro en sessionStorage para indicar que el mensaje se ha reproducido en esta sesión
  sessionStorage.setItem('mensajeReproducido', 'true');
}
*/





    // Agrega un evento de clic al icono de usuario
    const userIcon = document.getElementById("user-icon");
    if (userIcon) {
      userIcon.addEventListener("click", () => {
        const userDetails = document.querySelector(".user-details") as HTMLElement;
        if (userDetails) {
          // Cambia la visibilidad de los detalles del usuario al hacer clic
          userDetails.style.display = userDetails.style.display === "none" ? "block" : "none";
        }
      });
    }

    this.checkTokenExpiration();
  }

  checkTokenExpiration() {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const decodedToken = jwt_decode<MyToken>(token);
        const currentTimestamp = Date.now() / 1000;
  
    //    console.log('Token expira a:', decodedToken.exp ? new Date(decodedToken.exp * 1000).toLocaleString() : 'N/A');
      //  console.log('Tiempo actual:', new Date(currentTimestamp * 1000).toLocaleString());
  
        if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
          console.log('Token ha caducado. Realizando cierre de sesión.');
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        } else {
          console.log('Token válido.');
        }
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
  
    // Iniciar la verificación periódica del token después de iniciar sesión
   // console.log('Iniciando verificación periódica del token...');
    setInterval(() => {
      this.checkTokenExpiration();
    }, 300000); // Verificar cada minuto (ajusta el intervalo según tus necesidades)
  }
  createChart() {
    const labels = this.userData.map(item => item.estado);
    const data = this.userData.map(item => item.cantidad);
  
    this.chart = new Chart('userStatusChart', {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [{
          label: 'Estado de Usuarios',
          data: data,
          backgroundColor: [
            'rgba(0, 0, 255, 0.5)',
            'rgba(255, 0, 0, 0.5)',
            'rgba(255, 255, 0, 0.5)',
            'rgba(0, 128, 0, 0.5)',
          ],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: 'black', // Cambia el color del texto de la leyenda a negro
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ` ${context.label}: ${context.raw}`;
              },
            },
          },
        },
        animation: {
          duration: 2000,
          easing: 'easeOutBounce',
        },
      },
    });
  }
  
  
  
  
  sanitizeImage(imageUrl: string): SafeUrl {
    // Utiliza DomSanitizer para sanear la URL
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  toggLeConsulta(){
    this.isConsultaOpen=!this.isConsultaOpen;
  }

  toggleRegistro() {
    this.isRegistroOpen = !this.isRegistroOpen;
  }

  toggleInventario() {
    this.isInventarioOpen = !this.isInventarioOpen;
  }
  toggleVentas() {
    this.isVentasOpen = !this.isVentasOpen;
  }
  toggleGestacion(){
    this.isGestacionOpen= !this.isGestacionOpen;
  }

  toggleUsuario() {
    this.isUsuarioOpen = !this.isUsuarioOpen;
  }
  listadoUsuario() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoUsuariosComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoBarraco() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoBarracoComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoCerda() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoCerdaComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoPendienteConfirmacion() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(PendienteConfirmacionComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  
  listadoFechaParto() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(FechaPartosComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  
  listadoPacha() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoPachaComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoCliente() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ListadoClienteComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoControlCerda() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ControlCerdaComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  listadoControlParto() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ControlPartoComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  facturacion() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(FacturacionComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }

  listadoControlDestete() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ControlDesteteComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  CamadaLechones() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(CamadaLechonesComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  Ventas() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(VentasComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  producto() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ProductoComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  proveedor() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ProveedoresComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  facturacionC() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(FacturacionCComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  compras() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(CompraComponent );
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  ReportesVentas() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ReportesventasComponent );
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  ReportesCompras() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(ReportescomprasComponent );
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
  InfoParto() {
    this.showChart = false;
    // Limpia el contenido actual del contenedor
    this.viewContainerRef.clear();

    // Carga dinámicamente el componente "CrearUsuarioComponent" en el contenedor
    const factory = this.componentFactoryResolver.resolveComponentFactory(InfoPartoComponent );
    const componentRef = this.viewContainerRef.createComponent(factory);

    // Puedes hacer más configuraciones si es necesario antes de mostrar el componente
  }
 /****BLOQUEAR O HABILITAR BOTONES**************************************************** */
  checkPermisoConsulta(): boolean {
    const permisos = this.usuarioService.getNameAndRole().permisos;
    return permisos && permisos.consulta === "Si";
  }
  
  checkPermisoRegistro(): boolean {
    const permisos = this.usuarioService.getNameAndRole().permisos;
    return permisos && permisos.registro === "Si";
  }
  checkPermisoReporte(): boolean {
    const permisos = this.usuarioService.getNameAndRole().permisos;
    return permisos && permisos.reportes === "Si";
  }
  checkPermisoControl(): boolean {
    const permisos = this.usuarioService.getNameAndRole().permisos;
    return permisos && permisos.control === "Si";
  }
  checkPermisoUsuarios(): boolean {
    const permisos = this.usuarioService.getNameAndRole().permisos;
    return permisos && permisos.usuarios === "Si";
  }
  
  checkPermisoInventario(): boolean {
    const permisos = this.usuarioService.getNameAndRole().permisos;
    return permisos && permisos.inventario === "Si";
  }


}


