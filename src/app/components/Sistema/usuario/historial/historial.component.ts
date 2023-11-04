import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HistorialSesionService } from 'src/app/services/historialSesion.service'; // Importa el servicio
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  historial = this.data.historial; // Recibe el historial de sesiones

  // Aqu
}
