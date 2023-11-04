import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import jwt_decode, { JwtPayload } from 'jwt-decode'; // Importa jwt_decode y JwtPayload
import { ToastrService } from 'ngx-toastr';

interface MyToken extends JwtPayload {
  // Define aquí cualquier propiedad adicional que esperes en tu token
  // Por ejemplo, si tu token tiene un campo 'userId', puedes incluirlo aquí:
  userId: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    usuario: '',
    pass: ''
  };
  errorMessage = '';
  toastrConfigTime = { timeOut: 3000 }; // Por defecto, 3 segundos

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private errorStateMatcher: ErrorStateMatcher,
    private router: Router
  ) {}

  ngOnInit() {

  }

  shouldShowError(): boolean {
    return !!this.errorMessage; // Muestra el mensaje si errorMessage no está vacío
  }

  // Función para verificar si el token ha caducado
  checkTokenExpiration() {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const decodedToken = jwt_decode<MyToken>(token); // Especifica el tipo de datos esperado aquí
        const currentTimestamp = Date.now() / 1000; // Convertir a segundos
  
        console.log('Token expira a:', decodedToken.exp ? new Date(decodedToken.exp * 1000).toLocaleString() : 'N/A');
        console.log('Tiempo actual:', new Date(currentTimestamp * 1000).toLocaleString());
  
        if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
          // El token ha caducado, realiza una acción de cierre de sesión
          console.log('Token ha caducado. Realizando cierre de sesión.');
          localStorage.removeItem('token'); // Elimina el token
          this.router.navigate(['login']); // Redirige a la página de inicio de sesión
        } else {
          console.log('Token válido.');
        }
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
  }
  
  logIn() {
    console.log('Iniciando sesión...');
    console.log(this.user);

    this.authService.signin(this.user).subscribe(
      (res: any) => {
        console.log('Inicio de sesión exitoso:', res);
        localStorage.setItem('token', res.token);

        // Iniciar la verificación periódica del token después de iniciar sesión
        console.log('Iniciando verificación periódica del token...');
        setInterval(() => {
          this.checkTokenExpiration();
        }, 60000); // Verificar cada minuto (ajusta el intervalo según tus necesidades)
        this.toastr.success('Inicio de sesión exitoso', 'Correcto!!',  this.toastrConfigTime);

        this.router.navigate(['ingresoSistema']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
      
        // Verifica si el error contiene un mensaje personalizado
        if (error.error && error.error.error) {
          // Muestra el mensaje de error desde el backend en una alerta visual
          this.toastr.error(error.error.error, 'Error', this.toastrConfigTime);
        } else {
          // Si no hay un mensaje personalizado, muestra un mensaje genérico
          this.toastr.error('Error desconocido', 'Error', this.toastrConfigTime);
        }
      }
    );
  }
  


 
}