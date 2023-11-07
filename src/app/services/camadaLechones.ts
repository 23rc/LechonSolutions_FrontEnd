// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode, { JwtDecodeOptions } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class CamadaLechonesService {
  private apiUrl = 'https://lechonsolutionsbackend-production.up.railway.app'; // URL para operaciones relacionadas con usuarios

  constructor(
    private http: HttpClient,
    private jwrtHelper: JwtHelperService,
    ) {}
  
getData(): Observable<any[]> {
   return this.http.get<any[]>('https://lechonsolutionsbackend-production.up.railway.app/camadalechones');
}

insert(contenedorLocal: any) {
  return this.http.post(`https://lechonsolutionsbackend-production.up.railway.app/camadalechones/insertarCamada`, contenedorLocal);
}
actualizarCantidadLechones(camadaId: number, cantidadVendida: number): Observable<any> {
  return this.http.put(`https://lechonsolutionsbackend-production.up.railway.app/camadalechones/actualizarCantidad/${camadaId}`, { cantidadVendida });
}

getById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/camadalechones/editarCamadaLechones/${id}`);
}
editar(Id: number, contenedorDB: any): Observable<any> {
   // Utiliza la ruta correcta en tu servidor backend
   const url = `${this.apiUrl}/camadalechones/editarCamadaLechones/${Id}`;
   return this.http.put(url, contenedorDB);
 }

 delete(id: number) {
  return this.http.delete(`https://lechonsolutionsbackend-production.up.railway.app/camadalechones/camada-lechones/${id}`);
}
 
}
