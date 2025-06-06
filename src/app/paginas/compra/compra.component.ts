import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf'
import { CarritoService } from '../../servicios/carrito.service';
@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit {
  //declaracion de formulario reactivo para la compra
  formularioCompra!: FormGroup;


  //variable para almacenar el total de la compra (subtotal+envio)
  total!: number


  //costo fijo de envio 
  envio = 5000


  // indicador para saber si la factura ya fue generada
  facturaGenerada = false


  //objeto que contiene la informacion de la factura generada
  factura: any


  //controla la visibilidad del modal que muestra el PDF
  mostrarModal = false

  //fuente segura para mostrar el PDF generado en iframe (URL sanitizado)
  pdfSrc: SafeResourceUrl | undefined


  constructor(
    private fb: FormBuilder, //formbuilder para crear el formulario activo
    private carritoService: CarritoService, //servicio para manejar el carrito y obtener productos y total 
    private sanitizer: DomSanitizer //para sanitizar la URL del PDF y que angular lo permita mostrar
  ) { }

  //metodo que se ejecuta al inicializar el componente
  ngOnInit(): void {
    //formulario con los campos requerridos y validadores
    this.formularioCompra = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      metodoPago: ['', Validators.required],

    })
  }

  //calcula el total de la compra (subtotal+envio)

  calcularTotal(): number {
    const subtotal = this.carritoService.obtenerTotal();//obtiene subtotal del carrito
    this.total = subtotal + this.envio
    return this.total
  }

  //prepara los datos para la factura con cliente, productos, total y fecha
  emitirFactura(): void {
    const datosCliente = this.formularioCompra.value; //datos ingresados del formulario
    const productos = this.carritoService.obtenerProductos(); //productos del carrito
    const totalFinal = this.calcularTotal(); //total calculado con envio 
    //construye el objeto factura con toda la info necesaria
    this.factura = {
      cliente: datosCliente,
      productos: productos,
      envio: this.envio,
      total: totalFinal,
      fecha: new Date()
    };
    //marca que la factura fue generada
    this.facturaGenerada = true;
  }

  //metodo que se ejecuta al finalizar la compra (click al boton)
  //verifica validez del formulario, genera factura y muestra PDF
  finalizarCompra(): void {
    if (this.formularioCompra.valid) {
      this.emitirFactura();//crea la factura
      this.generarPDFModal();//genera y muestra el pdf en modal
    }
    else {
      this.formularioCompra.markAllAsTouched();//marca todos los campos como tocados para mostrar errores
    }
  }

  //genera el pdf con jtsPDF y crea la url para mostrar en iframe dentro del modal

  generarPDFModal(): void {
    if (!this.factura) return;//si no hay factura que no haga nada
    const doc = new jsPDF(); //crea instancia de jsPDF


    // agrega titulo y fecha al pdf
    doc.setFontSize(18)
    doc.text('factura de compra', 14, 20)

    doc.setFontSize(12);
    doc.text(`fecha: ${this.factura.fecha.toLocaleString}`, 14, 30)

    //informacion del cliente
    doc.text('cliente: ', 14, 40)

    const c = this.factura.cliente;
    doc.text(`Nombre: ${c.nombre}`, 20, 60);
    doc.text(`Direccion: ${c.direccion}`, 20, 50);
    doc.text(`Correo: ${c.correo}`, 20, 70);
    doc.text(`Telefono: ${c.telefono}`, 20, 80);
    doc.text(`Ciudad: ${c.ciudad}`, 20, 90);
    doc.text(`Provincia: ${c.provincia}`, 20, 100);
    doc.text(`Codigo Postal: ${c.codigoPostal}`, 20, 110);


    //listado de productos con cantidad, precio y subtotal

    let y =120
    doc.text('productos:' ,14,y)

    this.factura.productos.array.forEach((item:any, index : number ) => {
    y += 10;
    doc.text(
      `${index+1}.${item.producto.nombre} - Cantidad : ${item.cantidad} - Precio: ${item.producto.precio.toFixed(2)} - Subtotal: $ ${(item.producto.precio * item.cantidad).toFixed(2)} `,20,y)       
    
    });

    //costos finales

    y += 10;
    doc.text(`Costo de envio: $${this.factura.envio.toFirex(2)}`, 14,y)

    y+=10;
    doc.text(`Total a Pagar: $${this.factura.total.toFirex(2)}`, 14,y)

    //convierte el pdf y genera una url segura para angular
    const pdfBlob = doc.output(`blob`)
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob))
    
    //abre el modal que contiene el PDF 

    this.mostrarModal = true

  }

  //metodo para cerrar el modal y liberar la URL del PDF para evitar fugas de memoria

  cerrarModal(): void{
    this.mostrarModal = false;
    if(this.pdfSrc){
      //se revoca la URL para liberar recursos
    URL.revokeObjectURL((this.pdfSrc as any).changingThisBreaksApplicationSecurity)
    this.pdfSrc = undefined
    }
  }

  //Metodo para imprimir el PDF que eesta cargando dentro del iframe a la vista

  imprimirPDF():void{
    //obtiene la referencia al elemento iframe dek DOM mediante su ID 'pdfFrame'
    // puede devolver null si no se encuentra el elemento
    const iframe : HTMLIFrameElement | null = document.getElementById('pdfFrame') as HTMLIFrameElement;
    if(iframe && iframe.contentWindow){
      //le da foco al contenidp del iframe para asegurarse que la ventana correcta esta activa para imprimir
      iframe.contentWindow.focus();
      //llama al metodoprint() de la ventana del iframe para abrirla ventana de impresion del navegador
      iframe.contentWindow.print();
    } 
  }
}
