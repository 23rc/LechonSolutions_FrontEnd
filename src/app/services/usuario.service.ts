// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode, { JwtDecodeOptions } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://lechonsolutionsbackend-production.up.railway.app'; // URL para operaciones relacionadas con usuarios

  constructor(
    private http: HttpClient,
    private jwrtHelper: JwtHelperService,
    ) {}
  

    obtenerUsuarioPorId(userId: number) {
      return this.http.get(`${this.apiUrl}/usuarios/${userId}`);
    }

actualizarPermisos(permisoId: number, datosPermiso: any): Observable<any> {
  const url = `${this.apiUrl}/user/actualizarPermiso/${permisoId}`; // Reemplaza 'actualizarPermiso' con la ruta correcta en tu API
  
  return this.http.put(url, datosPermiso);
}
   obtenerPermisosPorUsuario(idUsuario: number): Observable<any> {
    const url = `${this.apiUrl}/user/usuarios/${idUsuario}/permisos`; // Reemplaza 'permisos' con la ruta adecuada en tu API
    return this.http.get(url);
  } 
  
    
getData(): Observable<any[]> {
   return this.http.get<any[]>('https://lechonsolutionsbackend-production.up.railway.app/user');
}
  
getById(Id: number): Observable<any> {
   return this.http.get<any>(`${this.apiUrl}/user/userEditar/${Id}`);
}
editar(Id: number, contenedorDB: any): Observable<any> {
    // Utiliza la ruta correcta en tu servidor backend
    const url = `${this.apiUrl}/user/userEditar/${Id}`;
    return this.http.put(url, contenedorDB);
  }

  getNameAndRole(): { nombres: string, apellidos: string, rol: string, imagenPerfil: string, permisos: any } {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: {
        nombres: string,
        apellidos: string,
        rol: string,
        imagenPerfil: string,
        permisos: any
      } = jwt_decode(token);
  
      const nombres = decodedToken.nombres;
      const apellidos = decodedToken.apellidos;
      const rol = decodedToken.rol;
      const imagenPerfil = decodedToken.imagenPerfil;
      const permisos = decodedToken.permisos;
  
      return { nombres, apellidos, rol, imagenPerfil, permisos };
    } else {
      return { nombres: '', apellidos: '', rol: '', imagenPerfil: '', permisos: {} };
    }
  }
  

  insert(contenedorLocal: any) {
    return this.http.post(`https://lechonsolutionsbackend-production.up.railway.app/user/userInsertar`, contenedorLocal);
  }
  delete(id: number) {
    return this.http.delete(`https://lechonsolutionsbackend-production.up.railway.app/user/userEliminacion/${id}`);
  }
 
  getDatosGraficaBarra(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user`);
  }
}