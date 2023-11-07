import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'https://lechonsolutionsbackend-production.up.railway.app';
  

  constructor(
    private http: HttpClient, 
    private jwrtHelper: JwtHelperService,
    ) { }


 //*******************************login************************* */
// Realiza una solicitud HTTP POST al servidor para autenticar al usuario con los datos proporcionados.
signin(user: any) {
  return this.http.post(`${this.URL}/user/signin`, user);
}

// Comprueba si el usuario está autenticado verificando la existencia y validez del token de autenticación en el almacenamiento local.
isAuth(): boolean {
  // Obtiene el token de autenticación del almacenamiento local.
  const token = localStorage.getItem('token');
  // Verifica si el token ha expirado utilizando una función llamada 'isTokenExpired' de 'jwrtHelper'.
  // También comprueba si el token existe en el almacenamiento local.
  if (this.jwrtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
    // Si el token ha expirado o no existe, devuelve 'false' (el usuario no está autenticado).
    return false;
  }
  // Si el token es válido y existe, devuelve 'true' (el usuario está autenticado).
  return true;
}

//--------------------------------usuario

}
