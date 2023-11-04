// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode, { JwtDecodeOptions } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private apiUrl = 'http://localhost:3000'; // URL para operaciones relacionadas con usuarios

  constructor(
    private http: HttpClient,
    private jwrtHelper: JwtHelperService,
    ) {}
  
    getData(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/compras');
     }
insert(contenedorLocal: any) {
  return this.http.post(`http://localhost:3000/compras/insertarCompras`, contenedorLocal);
}
delete(id: number) {
  return this.http.delete(`http://localhost:3000/compras/eliminarCompra/${id}`);
}
 

}
