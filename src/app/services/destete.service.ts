// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode, { JwtDecodeOptions } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class DesteteService {
  private apiUrl = 'https://lechonsolutionsbackend-production.up.railway.app'; // URL para operaciones relacionadas con usuarios

  constructor(
    private http: HttpClient,
    private jwrtHelper: JwtHelperService,
    ) {}
  
getData(): Observable<any[]> {
   return this.http.get<any[]>('https://lechonsolutionsbackend-production.up.railway.app/destete');
}

delete(id: number) {
    return this.http.delete(`https://lechonsolutionsbackend-production.up.railway.app/destete/eliminarDestete/${id}`);
  }


 
}
