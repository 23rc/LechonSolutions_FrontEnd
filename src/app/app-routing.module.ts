import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**PAGINA WEB */
import { InicioComponent } from './components/Pagina_Web/inicio/inicio.component';
/**AUTENTICACION */
import { LoginComponent } from './components/Autenticacion/login/login.component';
/**SISTEMA */
import { IngresoAlSistemaComponent } from './components/Sistema/ingreso-al-sistema/ingreso-al-sistema.component'

/**USUARIOS */
import { CrearUsuarioComponent } from './components/Sistema/usuario/crear-usuario/crear-usuario.component';
import { ListadoUsuariosComponent } from './components/Sistema/usuario/listado-usuarios/listado-usuarios.component';
import { EditarUsuarioComponent } from './components/Sistema/usuario/editar-usuario/editar-usuario.component';
import { UsuarioService } from 'src/app/services/usuario.service'; // Importa el nuevo servicio
import { HistorialComponent } from './components/Sistema/usuario/historial/historial.component';
/**BARRACOS */
import { ListadoBarracoComponent } from './components/Sistema/barraco/listado-barraco/listado-barraco.component';
import { CrearBarracoComponent } from './components/Sistema/barraco/crear-barraco/crear-barraco.component';
import { EditarBarracoComponent } from './components/Sistema/barraco/editar-barraco/editar-barraco.component';
import { BarracoService } from 'src/app/services/barraco.service'; // Importa el nuevo servicio
/**CERDAS */
import { ListadoCerdaComponent } from './components/Sistema/cerda/listado-cerda/listado-cerda.component';
import { CrearCerdaComponent } from './components/Sistema/cerda/crear-cerda/crear-cerda.component';
import { EditarCerdaComponent } from './components/Sistema/cerda/editar-cerda/editar-cerda.component';
/**PACHAS */
import { CrearPachaComponent } from './components/Sistema/pacha/crear-pacha/crear-pacha.component';
import { ListadoPachaComponent } from './components/Sistema/pacha/listado-pacha/listado-pacha.component';
import { EditarPachaComponent } from './components/Sistema/pacha/editar-pacha/editar-pacha.component';
import { FacturacionComponent } from './components/Sistema/inventario/facturacion/facturacion.component';
import { ControlCerdaComponent } from './components/Sistema/control-gestacion/control_cerdas/control-cerda/control-cerda.component';


import { EditarControlPartoComponent } from './components/Sistema/control-gestacion/control_parto/editar-control-parto/editar-control-parto.component';


const routes: Routes = [
  /**PAGINA WEB */
  { path: 'inicio', component: InicioComponent },
  /**AUTENTICACION */
  { path: 'login', component: LoginComponent },
  /**SISTEMA */
  { path: 'ingresoSistema', component: IngresoAlSistemaComponent},
 /**USUARIOS */
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'listaUsuarios', component: ListadoUsuariosComponent },
  { path: 'editar-usuario/:id',component: EditarUsuarioComponent},
  { path: 'historial',component: HistorialComponent},
  /**BARRACO */
  { path: 'listaBarraco', component: ListadoBarracoComponent },
  { path: 'crear-barraco', component: CrearBarracoComponent },
  { path: 'editar-barraco/:id',component: EditarBarracoComponent},
  /**CERDAS */
  { path: 'listaCerda', component: ListadoCerdaComponent },
  { path: 'crear-cerda', component: CrearCerdaComponent },
  { path: 'editar-cerda/:id',component: EditarCerdaComponent},
  /**CERDAS */
  { path: 'listaPacha', component: ListadoPachaComponent },
  { path: 'crear-pacha', component: CrearCerdaComponent },
  { path: 'editar-pacha/:id',component: EditarPachaComponent},

  { path: 'editar-controlParto/:id',component:  EditarControlPartoComponent },

  
  { path: 'facturacion',component: FacturacionComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
