import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js'; // Asegúrate de importar Chart desde 'chart.js'
import { jsPDF } from 'jspdf';


interface Compra {
  nombreProducto: string;
  cantidad_vendida: number;
  precio_unitario: number;
  total: number;
  fecha: Date;
}
interface CompraMensual {
  month: number; // Asegúrate de que coincida con el tipo de datos en tu backend
  total: number;
}
@Component({
  selector: 'app-reportescompras',
  templateUrl: './reportescompras.component.html',
  styleUrls: ['./reportescompras.component.css']
})
export class ReportescomprasComponent {

  @ViewChild('chartContainer') chartContainer!: ElementRef;
  @ViewChild('chartContainer2') chartContainer2!: ElementRef;
  currentDate: Date = new Date();


  constructor(private http: HttpClient) {}
  generarPDF() {
    // Crea un objeto jsPDF
    const doc = new jsPDF();
    let xPosition = 30; // Posición X inicial
  
    // Ajusta la posición horizontal (izquierda o derecha)
    const xOffset = 21; // Modifica este valor según tus necesidades
  
    // Establece una posición inicial para empezar a agregar contenido
    let yPosition = 20;
  
    // Ajusta el título principal hacia la derecha
    doc.setFontSize(16);
    const titulo = 'Informe de Compras Mensuales';
  
    // Calcula el ancho del título
    const tituloWidth = doc.getTextWidth(titulo);
    xPosition = (doc.internal.pageSize.width - tituloWidth) / 2 + xOffset; // Ajusta la posición horizontal
    doc.text(titulo, xPosition, yPosition);
    yPosition += 10;
  
    // Agrega el contenido del encabezado (tu logotipo y detalles de la empresa)
    doc.addImage('/assets/Logotipo.png', 'PNG', 10 + xOffset, yPosition, 40, 40);
    doc.text('Empresa: Granja Santa Sofía', 60 + xOffset, yPosition + 10);
    doc.text('Ubicación: San Lucas Tolimán, Sololá', 60 + xOffset, yPosition + 20);
    doc.text('Fecha: ' + this.currentDate.toLocaleDateString(), 60 + xOffset, yPosition + 30);
    yPosition += 50; // Ajusta la posición vertical
  
    // Agrega el contenido de tus informes (puedes personalizar esto según tus datos)
    // Por ejemplo, para el primer informe de compras
    doc.setFontSize(14);
    doc.text('Informe de Compras', 10 + xOffset, yPosition);
    yPosition += 10;
  
    // Ajusta el tamaño de los diagramas (aumenta o reduce el valor de scale según tus necesidades)
    const scale = 0.8; // Aumenta el valor para hacer los diagramas más grandes
  
    // Agrega el gráfico o contenido de tu informe
    const chartCanvas = this.chartContainer.nativeElement;
    const chartImage = chartCanvas.toDataURL('image/jpeg', 1.0);
    doc.addImage(chartImage, 'JPEG', 10 + xOffset, yPosition, 180 * scale, 100 * scale); // Ajusta las dimensiones
  
    yPosition += 110 * scale; // Ajusta la posición vertical para la segunda gráfica
  
    // Repite el proceso para el segundo informe de compras
    doc.setFontSize(14);
    doc.text('Informe del Mes', 10 + xOffset, yPosition);
    yPosition += 10;
  
    const chartCanvas2 = this.chartContainer2.nativeElement;
    const chartImage2 = chartCanvas2.toDataURL('image/jpeg', 1.0);
    doc.addImage(chartImage2, 'JPEG', 10 + xOffset, yPosition, 180 * scale, 100 * scale);
  
    // Guarda el PDF en un archivo o abre una ventana de impresión
    doc.save('Informe_Compras.pdf');
  }
  
  



  ngOnInit() {
    this.http.get<Compra[]>('http://localhost:3000/compras').subscribe(data => {
      // Procesa los datos para el gráfico de compras
      const labels = data.map(compra => compra.nombreProducto);
      const totals = data.map(compra => compra.total);

      // Crea el gráfico de barras para el informe de compras
      const ctx = this.chartContainer.nativeElement.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total de Compras',
              data: totals,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });


    this.http.get<CompraMensual[]>('http://localhost:3000/compras/compras-mensuales').subscribe(data => {
      const months = data.map(item => item.month);
      const monthlyTotals = data.map(item => item.total);

      const ctx = this.chartContainer2.nativeElement.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Compras Mensuales',
              data: monthlyTotals,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }


  }

