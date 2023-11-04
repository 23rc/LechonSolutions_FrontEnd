import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal
import { MatButtonModule } from '@angular/material/button'; // Importa los componentes de Material que necesitas
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/**Pagina Web */
import { InicioComponent } from './components/Pagina_Web/inicio/inicio.component';
import { ServiciosComponent } from './components/Pagina_Web/servicios/servicios.component';
import { GaleriaComponent } from './components/Pagina_Web/galeria/galeria.component';
import { QuienesSomosComponent } from './components/Pagina_Web/quienes-somos/quienes-somos.component';
import { ContactosComponent } from './components/Pagina_Web/contactos/contactos.component';
/**Autenticacion */
import { LoginComponent } from './components/Autenticacion/login/login.component';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS }  from '@auth0/angular-jwt'
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogoutButtonComponent } from './components/Autenticacion/logout-button/logout-button.component';
/**Sistema */
import { IngresoAlSistemaComponent } from './components/Sistema/ingreso-al-sistema/ingreso-al-sistema.component';
/**Usuarios */
import { CrearUsuarioComponent } from './components/Sistema/usuario/crear-usuario/crear-usuario.component';
import { ListadoUsuariosComponent } from './components/Sistema/usuario/listado-usuarios/listado-usuarios.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarUsuarioComponent } from './components/Sistema/usuario/editar-usuario/editar-usuario.component';
import { UsuarioService } from 'src/app/services/usuario.service';

/**Barracos */
import { ListadoBarracoComponent } from './components/Sistema/barraco/listado-barraco/listado-barraco.component';
import { CrearBarracoComponent } from './components/Sistema/barraco/crear-barraco/crear-barraco.component';
import { EditarBarracoComponent } from './components/Sistema/barraco/editar-barraco/editar-barraco.component';
import { BarracoService } from 'src/app/services/barraco.service';
/**Cerdas */
import { ListadoCerdaComponent } from './components/Sistema/cerda/listado-cerda/listado-cerda.component';
import { CrearCerdaComponent } from './components/Sistema/cerda/crear-cerda/crear-cerda.component';
import { EditarCerdaComponent } from './components/Sistema/cerda/editar-cerda/editar-cerda.component';
import { CerdaService } from 'src/app/services/cerda.service';
/**Pachas */
import { CrearPachaComponent } from './components/Sistema/pacha/crear-pacha/crear-pacha.component';
import { ListadoPachaComponent } from './components/Sistema/pacha/listado-pacha/listado-pacha.component';
import { EditarPachaComponent } from './components/Sistema/pacha/editar-pacha/editar-pacha.component';
import { PachaService } from 'src/app/services/pacha.service';
import { HistorialComponent } from './components/Sistema/usuario/historial/historial.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FacturacionComponent } from './components/Sistema/inventario/facturacion/facturacion.component';
import { ListadoClienteComponent } from './components/Sistema/inventario/listado-cliente/listado-cliente.component';
import { EditarClienteComponent } from './components/Sistema/inventario/editar-cliente/editar-cliente.component';
import { CrearClienteComponent } from './components/Sistema/inventario/crear-cliente/crear-cliente.component';
import { ControlCerdaComponent } from './components/Sistema/control-gestacion/control_cerdas/control-cerda/control-cerda.component';
import { CrearControlComponent } from './components/Sistema/control-gestacion/control_cerdas/crear-control/crear-control.component';
import { EditarControlComponent } from './components/Sistema/control-gestacion/control_cerdas/editar-control/editar-control.component';
import { ControlPartoComponent } from './components/Sistema/control-gestacion/control_parto/control-parto/control-parto.component';
import { CrearControlPartoComponent } from './components/Sistema/control-gestacion/control_parto/crear-control-parto/crear-control-parto.component';
import { EditarControlPartoComponent } from './components/Sistema/control-gestacion/control_parto/editar-control-parto/editar-control-parto.component';
import { PendienteConfirmacionComponent } from './components/Sistema/reportes/pendiente-confirmacion/pendiente-confirmacion.component';
import { FechaPartosComponent } from './components/Sistema/reportes/fecha-partos/fecha-partos.component';
import { ScrollReverserDirective } from './scroll-reverser.directive';
import { ModalConfirmacionComponent } from './components/Sistema/control-gestacion/control_parto/modal-confirmacion/modal-confirmacion.component';
import { EliminarTratamientoComponent } from './components/Sistema/control-gestacion/control_parto/modales/eliminar-tratamiento/eliminar-tratamiento/eliminar-tratamiento.component';
import { EditarTratamientoComponent } from './components/Sistema/control-gestacion/control_parto/modales/editar-tratamiento/editar-tratamiento/editar-tratamiento.component';
import { NuevoTratamientoComponent } from './components/Sistema/control-gestacion/control_parto/modales/nuevo-tratamiento/nuevo-tratamiento/nuevo-tratamiento.component';
import { NuevaTemperaturaComponent } from './components/Sistema/control-gestacion/control_parto/modales/nuevo-temperatura/nueva-temperatura/nueva-temperatura.component';
import { EliminarTemperaturaComponent } from './components/Sistema/control-gestacion/control_parto/modales/eliminar-temperatura/eliminar-temperatura/eliminar-temperatura.component';
import { EditarTemperaturaComponent } from './components/Sistema/control-gestacion/control_parto/modales/editar-temperatura/editar-temperatura/editar-temperatura.component';
import { EliminarPartoComponent } from './components/Sistema/control-gestacion/control_parto/modales/eliminar-parto/eliminar-parto/eliminar-parto.component';
import { EditarPartoComponent } from './components/Sistema/control-gestacion/control_parto/modales/editar-parto/editar-parto/editar-parto.component';
import { NuevoPartoComponent } from './components/Sistema/control-gestacion/control_parto/modales/nuevo-parto/nuevo-parto/nuevo-parto.component';
import { ControlDesteteComponent } from './components/Sistema/control-gestacion/control-destete/control-destete/control-destete.component';
import { CamadaLechonesComponent } from './components/Sistema/inventario/camada-lechones/camada-lechones.component';
import { EditarCamadaComponent } from './components/Sistema/inventario/editar-camada/editar-camada.component';
import { VentasComponent } from './components/Sistema/inventario/ventas/ventas.component';
import { ProductoComponent } from './components/Sistema/compras/producto/producto.component';
import { EditarProductoComponent } from './components/Sistema/compras/editar-producto/editar-producto.component';
import { ProveedoresComponent } from './components/Sistema/compras/proveedores/proveedores.component';
import { EditarProveedoresComponent } from './components/Sistema/compras/editar-proveedores/editar-proveedores.component';
import { FacturacionCComponent } from './components/Sistema/compras/facturacion-c/facturacion-c.component';
import { CompraComponent } from './components/Sistema/compras/compra/compra.component';
import { EliminarResumenPartoComponent } from './components/Sistema/control-gestacion/control_parto/modales/eliminar-resumen-parto/eliminar-resumen-parto.component';
import { ReportesventasComponent } from './components/Sistema/reportes/reportesventas/reportesventas.component';
import { ReportescomprasComponent } from './components/Sistema/reportes/reportescompras/reportescompras.component';
import { InfoPartoComponent } from './components/Sistema/control-gestacion/control_parto/info-parto/info-parto.component';


@NgModule({
  declarations: [
    AppComponent,
    /**Pagina Web */
    InicioComponent,
    ServiciosComponent,
    GaleriaComponent,
    QuienesSomosComponent,
    ContactosComponent,
    /**Autentiacion */
    LoginComponent,
    LogoutButtonComponent,
    /**Sistema */
    IngresoAlSistemaComponent,
    /**Usuarios */
    CrearUsuarioComponent,
    ListadoUsuariosComponent,
    EditarUsuarioComponent,
    /**Barracos */
    ListadoBarracoComponent,
    CrearBarracoComponent,
    EditarBarracoComponent,
    /**Cerdas */
    ListadoCerdaComponent,
    CrearCerdaComponent,
    EditarCerdaComponent,
    /**Pachas */
    CrearPachaComponent,
    ListadoPachaComponent,
    EditarPachaComponent,
    HistorialComponent,
    FacturacionComponent,
    ListadoClienteComponent,
    EditarClienteComponent,
    CrearClienteComponent,
    ControlCerdaComponent,
    CrearControlComponent,
    EditarControlComponent,
    ControlPartoComponent,
    CrearControlPartoComponent,
    EditarControlPartoComponent,
    PendienteConfirmacionComponent,
    FechaPartosComponent,
    ScrollReverserDirective,
    ModalConfirmacionComponent,
    EliminarTratamientoComponent,
    EditarTratamientoComponent,
    NuevoTratamientoComponent,
    NuevaTemperaturaComponent,
    EliminarTemperaturaComponent,
    EditarTemperaturaComponent,
    EliminarPartoComponent,
    EditarPartoComponent,
    NuevoPartoComponent,
    ControlDesteteComponent,
    CamadaLechonesComponent,
    EditarCamadaComponent,
    VentasComponent,
    ProductoComponent,
    EditarProductoComponent,
    ProveedoresComponent,
    EditarProveedoresComponent,
    FacturacionCComponent,
    CompraComponent,
    EliminarResumenPartoComponent,
    ReportesventasComponent,
    ReportescomprasComponent,
    InfoPartoComponent,




 

  ],
  imports: [
    BrowserAnimationsModule, // Importa BrowserAnimationsModule
    ToastrModule.forRoot(), // Configura ToastrModule
    BrowserModule,
    AppRoutingModule,
    /**Autenticacion */
    HttpClientModule,
    FormsModule,
    /**Sistema */
    NgbModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    BrowserAnimationsModule,
  ],
  providers: [
    UsuarioService,
    BarracoService,
    CerdaService,
    PachaService,
    NgbActiveModal,
        /**Autentication */
        // JWT
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        // Token interceptor
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
