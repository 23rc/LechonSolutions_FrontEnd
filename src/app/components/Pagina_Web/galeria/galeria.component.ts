import { Component } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {
  images: string[] = [
    '/assets/Lechon1 (1).jpg',
    '/assets/Lechon1 (2).jpg',
    '/assets/Lechon1 (3).jpg',
    '/assets/Lechon1 (4).jpg',
    '/assets/Lechon1 (5).jpg',
    '/assets/Lechon1 (6).jpg',
    '/assets/Lechon1 (7).jpg',
    '/assets/Lechon1 (8).jpg',
    '/assets/Lechon1 (9).jpg',
    ]; // Agrega tus rutas de imagen aquí
    currentImageIndex: number = 0;
    interval: any;
  
    ngOnInit() {
      this.startImageChangeInterval();
    }
  
    ngOnDestroy() {
      this.stopImageChangeInterval();
    }
  
    startImageChangeInterval() {
      this.interval = setInterval(() => {
        this.showNextImages();
      }, 3000); // Cambia de imagen cada 3 segundos (ajusta según tus necesidades)
    }
  
    stopImageChangeInterval() {
      clearInterval(this.interval);
    }
  
    showNextImages() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
  
    showPreviousImages() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    }
  
    get nextImageIndex() {
      return (this.currentImageIndex + 1) % this.images.length;
    }
}
