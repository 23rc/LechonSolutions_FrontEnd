// historial-sesion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define un tipo para el historial de sesión
interface HistorialSesion {
  id: number;
  // ... otras propiedades del historial ...
}

@Injectable({
  providedIn: 'root'
})
export class HistorialSesionService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}
  
    obtenerHistorialDeSesionPorUsuario(userId: number): Observable<HistorialSesion[]> {
        console.log('Enviando solicitud para obtener historial de sesiones del usuario con ID:', userId);
      // Reemplaza 'URL_DE_TU_API' con la URL real de tu API
      return this.http.get<HistorialSesion[]>(`http://localhost:3000/sesion/historial/${userId}`);
    }
}

