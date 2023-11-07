import { Component, OnInit, numberAttribute } from '@angular/core';
import { BarracoService } from 'src/app/services/barraco.service'; // I
import { ClienteService } from 'src/app/services/cliente.service'; // I
import { VentasService } from 'src/app/services/ventas'; // I
import { CamadaLechonesService } from 'src/app/services/camadaLechones'; // I
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { jsPDF } from 'jspdf';




interface Camada {
  id: number;
  codigo_camada: string;
  cerda_nombre: string;
  tip_carga: string;
  lechones: number;
  precio_unidad: string;
  vender: number; // Agrega la propiedad 'vender' de tipo número
  // Agrega más propiedades si es necesario
}

interface Barraco {
  id: number;
  nombre: string;
  peso: string;
  estadoSalud: string;
  precio: string;
  
  // Agrega más propiedades si es necesario
}
interface Cliente {
  nit:string;
  id: number;
  nombre: string;
  telefono:string;
  correo:string;
  direccion:string;
  
  // Agrega más propiedades si es necesario
}


@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

  barracos: Barraco[] = [];
  barracoSeleccionado: Barraco | undefined;
  nombreCliente: string = '';
  itemsFactura: Barraco[] = [];
  mostrarSeleccionBarracos: boolean = false;

  camadas: Camada[] = [];
  camadaSeleccionada: Camada | undefined;
  mostrarSeleccionCamada: boolean = false;
  itemsFacturaCamada:Camada[] = [];


  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | undefined;
  mostrarCamposNuevoCliente = false;
  mostrarCamposClienteExistente = true;
   // Variable para la configuración común de Toastr
   toastrConfigTime = { timeOut: 1500 }; // Por defecto, 3 segundos
  



  nuevoCliente = {
    nit: '',
    nombre: '',
    telefono: '',
    correo: '',
    direccion: ''
  };
  toastrConfig: Partial<IndividualConfig> = {
    positionClass: 'toast-center-center', // Aplica la clase CSS personalizada para centrar
  };
  constructor(
    private barracoService: BarracoService,
    private ventasService: VentasService,
    private camadaLechonesService: CamadaLechonesService,
    private clienteService: ClienteService,
    private http: HttpClient,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef, // Agrega esta línea

    
    ) {}

  alternarCamposNuevoCliente() {
    this.mostrarCamposNuevoCliente = !this.mostrarCamposNuevoCliente;
    this.mostrarCamposClienteExistente = !this.mostrarCamposClienteExistente;
  }
  seleccionarBarraco(event: any) {
    const barracoId = event.target.value;
    
    if (barracoId === "ocultar") {
      // Si se selecciona "Ocultar Barraco", oculta los datos del barraco
      this.barracoSeleccionado = undefined;
    } else {
      // Si se selecciona un barraco diferente, obtén sus datos
      this.http.get<Barraco>(`https://lechonsolutionsbackend-production.up.railway.app/barraco/barraco/${barracoId}`)
        .subscribe((barraco: Barraco) => {
          console.log('Barraco seleccionado:', barraco);
          this.barracoSeleccionado = barraco;
        }, error => {
          console.error('Error al seleccionar el barraco:', error);
        });
    }
  }
  seleccionarCamada(event: any) {
    const camadaId = event.target.value;
  
    if (camadaId === "ocultar") {
      // Si se selecciona "Ocultar Camada", oculta los datos de la camada
      this.camadaSeleccionada = undefined;
    } else {
      // Si se selecciona una camada diferente, obtén sus datos
      this.http.get<Camada>(`https://lechonsolutionsbackend-production.up.railway.app/camadalechones/camadaLechones/${camadaId}`)
        .subscribe((camada: Camada) => {
          console.log('Camada seleccionada:', camada);
          this.camadaSeleccionada = camada;
        }, error => {
          console.error('Error al seleccionar la camada:', error);
        });
    }
  }
  
  seleccionarCliente(event: any) {
    const clienteId = event.target.value;
    
    if (clienteId === "ocultar") {
      // Si se selecciona "Ocultar Cliente", oculta los datos del cliente
      this.clienteSeleccionado = undefined;
      this.mostrarCamposClienteExistente = false;
    } else {
      // Si se selecciona un cliente diferente, obtén sus datos
      this.http.get<Cliente>(`https://lechonsolutionsbackend-production.up.railway.app/cliente/cliente/${clienteId}`)
        .subscribe((cliente: Cliente) => {
          console.log('Cliente seleccionado:', cliente);
          this.clienteSeleccionado = cliente;
          // Muestra los campos del cliente existente y oculta los del nuevo cliente
          this.mostrarCamposNuevoCliente = false;
          this.mostrarCamposClienteExistente = true;
  
          // Luego, si el cliente se selecciona aquí, el clienteSeleccionado se establecerá correctamente.
        }, error => {
          console.error('Error al seleccionar el cliente:', error);
        });
    }
  }
  ngOnInit(): void {
    this.barracoService.getData().subscribe(data => {
      this.barracos = data;
      console.log('Datos de barracos obtenidos:', data);
    });
    this.clienteService.getData().subscribe(data => {
      this.clientes = data;
      console.log('Datos de clientes obtenidos:', data);
    });
    this.camadaLechonesService.getData().subscribe(data => {
      this.camadas = data;
      console.log('Datos de clientes obtenidos:', data);
    });
  }
  agregarItemFactura() {
    if (this.barracoSeleccionado) {
      const existeItem = this.itemsFactura.some((item) => item.id === this.barracoSeleccionado!.id);
  
      if (!existeItem) {
        this.itemsFactura.push(this.barracoSeleccionado);
  
        // Crea la alerta visual de éxito usando toastrConfig
        this.toastr.success('Artículo agregado a la factura', 'Éxito', this.toastrConfigTime);
        console.log('Valores de itemsFactura después de agregar:', this.itemsFactura);
      } else {
        // Crea la alerta visual de advertencia usando toastrConfig
        this.toastr.warning('El artículo ya existe en la factura', 'Advertencia', this.toastrConfigTime);
      }
    } else {
      // Crea la alerta visual de error usando toastrConfig
      this.toastr.error('No se ha seleccionado ningún barraco', 'Error', this.toastrConfigTime);
    }
  }
  agregarCamadaFactura() {
    if (this.camadaSeleccionada) {
      // Verifica si el campo 'lechones' es mayor que cero
      if (this.camadaSeleccionada.lechones > 0) {
        // Verifica que se haya ingresado una cantidad válida
        if (this.camadaSeleccionada.vender && this.camadaSeleccionada.vender <= this.camadaSeleccionada.lechones) {
          const existeItemCamada = this.itemsFacturaCamada.some((itemCamada) => itemCamada.id === this.camadaSeleccionada!.id);
  
          if (!existeItemCamada) {
            // Agrega la cantidad a vender a la camada seleccionada
            const camadaConCantidad = { ...this.camadaSeleccionada };
            camadaConCantidad.vender = this.camadaSeleccionada.vender;
  
            this.itemsFacturaCamada.push(camadaConCantidad);
  
            // Crea la alerta visual de éxito usando toastrConfig
            this.toastr.success('Artículo agregado a la factura', 'Éxito', this.toastrConfigTime);
            console.log('Valores de itemsFactura después de agregar:', this.itemsFacturaCamada);
          } else {
            // Crea la alerta visual de advertencia usando toastrConfig
            this.toastr.warning('El artículo ya existe en la factura', 'Advertencia', this.toastrConfigTime);
          }
        } else {
          // Crea la alerta visual de error si no se ha ingresado una cantidad válida
          this.toastr.error('Ingresa una cantidad válida', 'Error', this.toastrConfigTime);
        }
      } else {
        // Crea la alerta visual de error si no hay suficiente existencia
        this.toastr.error('No hay suficiente existencia de lechones', 'Error', this.toastrConfigTime);
      }
    } else {
      // Crea la alerta visual de error si no se ha seleccionado ningún barraco
      this.toastr.error('No se ha seleccionado ningún barraco', 'Error', this.toastrConfigTime);
    }
  }
  calcularTotalFactura() {
    let total = 0;
    for (const itemFactura of this.itemsFacturaCamada) {
      const precioNumerico = parseFloat(itemFactura.precio_unidad);
      const cantidad = itemFactura.vender;
  
      if (!isNaN(precioNumerico) && !isNaN(cantidad)) {
        total += precioNumerico * cantidad;
      }
    }
    return total.toFixed(2);
  }
  facturado = false;
  generarFacturaPDF(cliente: any) {
    const pdf = new jsPDF();
    const numeroFactura = Math.floor(1000 + Math.random() * 9000).toString();
  
    // Obtener la fecha de emisión actual
    const fechaEmision = new Date().toLocaleDateString();
  
    // Agrega el logotipo de la empresa centrado
    const logoURL = 'assets/Logotipo.png';
    pdf.addImage(logoURL, 'PNG', 80, 20, 40, 40);
  
    // Título "GRANJA SANTA SOFIA" centrado
    pdf.setFontSize(18);
    pdf.text("GRANJA SANTA SOFIA", pdf.internal.pageSize.width / 2, 70, { align: 'center' });
  
    // Información de la empresa a la izquierda
    pdf.setFontSize(11);
    pdf.text("Información de la empresa", 30, 90);
    pdf.text("Nombre de la empresa: Granja Santa Sofía", 30, 100);
    pdf.text("Dirección: San Lucas Tolimán", 30, 110);
    pdf.text("Teléfono: 37112542", 30, 120);
    pdf.text("Email: carlos@gmail.com", 30, 130);
  
    // Información del cliente a la derecha
    pdf.text("Información del cliente", 120, 90);
    pdf.text("Nombre del cliente: " + cliente.nombre, 120, 100);
    pdf.text("Dirección: " + cliente.direccion, 120, 110);
    pdf.text("Teléfono: " + cliente.telefono, 120, 120);
    pdf.text("Email: " + cliente.correo, 120, 130);
  
    // Detalles de la factura
    pdf.text("Detalles de la factura", pdf.internal.pageSize.width / 2, 160, { align: 'center' });
    pdf.text(`Número de factura: ${numeroFactura}`, 30, 170);
    pdf.text(`Fecha de emisión: ${fechaEmision}`, 30, 180);
  
    // Encabezados de la tabla
    pdf.setLineWidth(0.2);
    pdf.line(30, 182, pdf.internal.pageSize.width - 30, 182);
    pdf.setFontSize(12);
    pdf.text("Descripción", 30, 190);
    pdf.text("Cantidad", 100, 190);
    pdf.text("Precio unitario", 150, 190);
    pdf.text("Total", 180, 190);
  
    // Detalles de la factura en una tabla
    let y = 200; // Posición vertical de los detalles
    let subtotal = 0;
  
    this.itemsFacturaCamada.forEach((item, index) => {
      const descripcion = `Producto ${index + 1}`;
      const cantidad = item.vender;
      const precioUnitario = parseFloat(item.precio_unidad);
      const total = cantidad * precioUnitario;
      subtotal += total;
  
      pdf.text(descripcion, 30, y);
      pdf.text(cantidad.toString(), 100, y);
      pdf.text("Q" + precioUnitario.toFixed(2), 150, y);
      pdf.text("Q" + total.toFixed(2), 180, y);
      y += 10;
    });
  
    // Subtotal
    pdf.text("Subtotal:", 30, y + 10);
    pdf.text("Q" + subtotal.toFixed(2), 180, y + 10);
  
    // Total a pagar
    pdf.setFontSize(16);
    pdf.setFont("bold");
    pdf.text("Total a pagar:", 30, y + 20);
    pdf.text("Q" + subtotal.toFixed(2), 180, y + 20);
  
    // Agradecimiento
    pdf.setFontSize(16);
    pdf.text("¡GRACIAS POR SU COMPRA!", pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height - 20, { align: 'center' });
  
    // Guardar o mostrar el PDF
    pdf.save('factura.pdf');
  }
  
  

  facturar() {
    // Obtener los datos del cliente seleccionado (si existe)
    let clienteFactura = {
      nombre: '',
      nit: '',
      telefono: '',
      correo: '',
      direccion: ''
    };
  
    if (this.clienteSeleccionado) {
      clienteFactura = {
        nombre: this.clienteSeleccionado.nombre,
        nit: this.clienteSeleccionado.nit,
        telefono: this.clienteSeleccionado.telefono,
        correo: this.clienteSeleccionado.correo,
        direccion: this.clienteSeleccionado.direccion
      };
      console.log('Datos del cliente enviados al pdf:', clienteFactura);
    }
  
    if (this.itemsFacturaCamada.length > 0) {
      // Recorre todos los elementos de la factura
      this.itemsFacturaCamada.forEach(camada => {
        const camadaId = camada.id;
        const cantidadVendida = camada.vender;
  
        // Realiza la actualización en la base de datos
        this.camadaLechonesService.actualizarCantidadLechones(camadaId, cantidadVendida).subscribe(
          (response) => {
            // La actualización fue exitosa
            console.log('Cantidad de lechones actualizada:', response);
          },
          (error) => {
            console.error('Error al actualizar la cantidad de lechones:', error);
          }
        );
  
        // Convierte el precio_unidad en un número
        const precioUnidadNumber = parseFloat(camada.precio_unidad);
  
        // Construye los datos de la venta
        const ventaData = {
          codigo_camada: camada.codigo_camada,
          cantidad_vendida: cantidadVendida,
          precio_unitario: precioUnidadNumber,
          total: cantidadVendida * precioUnidadNumber,
          IDCliente: this.clienteSeleccionado?.id || 0, // ID del cliente seleccionado o 0 si no existe
          IDCamada: camadaId,
          fecha: new Date() // Fecha actual, puedes personalizarla si es necesario
        };
  console.log('Datos mandados a insertarse en ventas:',ventaData)
        // Realiza la inserción en la base de datos (cambia esto según tu servicio o lógica)
        this.ventasService.insert(ventaData).subscribe(
          (response) => {
            console.log('Venta insertada con éxito:', response);
          },
          (error) => {
            console.error('Error al insertar la venta:', error);
          }
        );
      });
      this.generarFacturaPDF(clienteFactura);
      // Restablece la factura
      this.itemsFacturaCamada = [];
    }
  
    // Restablece la selección de cliente y barraco
    this.clienteSeleccionado = undefined;
    this.mostrarCamposClienteExistente = false;
    this.camadaSeleccionada = undefined;
  
    if (this.mostrarCamposNuevoCliente) {
      // Aquí construye el objeto contenedorLocal con los datos del nuevo cliente
      const contenedorLocal = {
        nit: this.nuevoCliente.nit,
        nombre: this.nuevoCliente.nombre,
        telefono: this.nuevoCliente.telefono,
        correo: this.nuevoCliente.correo,
        direccion: this.nuevoCliente.direccion
      };
  
      // Llama al servicio para insertar el nuevo cliente
      this.clienteService.insert(contenedorLocal).subscribe(
        (response) => {
          console.log('Nuevo cliente insertado con éxito:', response);
          this.refrescarVistaSeleccion();
  
          // Ocultar los campos de nuevo cliente y restablecer el objeto nuevoCliente
          this.mostrarCamposNuevoCliente = false;
          this.nuevoCliente = {
            nit: '',
            nombre: '',
            telefono: '',
            correo: '',
            direccion: ''
          };
        },
        (error) => {
          console.error('Error al insertar el nuevo cliente:', error);
        }
      );
    }
  
    this.facturado = true;
    this.toastr.success('Facturado exitosamente', 'Correcto!!', this.toastrConfigTime);
  
    // Refresca la vista de selección de barracos y clientes
    this.refrescarVistaSeleccion();
  }
  
  
  
    pulsarBotonFacturar() {
      // Simula el evento click en el botón de facturar
      const botonFacturar = document.getElementById('botonFacturar');
      if (botonFacturar) {
        botonFacturar.click();
      }
    }
  
    refrescarVistaSeleccion() {
      // Vuelve a consultar los datos de barraco y cliente para mantener la vista actualizada
      this.camadaLechonesService.getData().subscribe(data => {
        this.camadas = data;
        console.log('Datos de lechones obtenidos:', data);
      });
    
      this.clienteService.getData().subscribe(data => {
        this.clientes = data;
        console.log('Datos de clientes obtenidos:', data);
      });
    }

  agregarBarraco() {
    this.mostrarSeleccionBarracos = true;
  }
  agregarCamada() {
    this.mostrarSeleccionCamada = true;
  }


  eliminarItemFactura(index: number) {
    if (index >= 0 && index < this.itemsFacturaCamada.length) {
      this.itemsFacturaCamada.splice(index, 1); // Elimina el elemento de la lista
    }
  }
  
}