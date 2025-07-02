import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Producto } from '../../modelos/producto.model';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  Productos: Producto[] = [
    {
      id: 1,
      nombre: 'Toppers',
      descripcion: 'Minions',
      precio: 2500,
      img: 'img/pro.png',
      disponibilidad: true,
    },
    {
      id: 2,
      nombre: 'Cajitas Milk ',
      descripcion: 'Boca Juniors',
      precio: 10000,
      img: 'img/pro1.png',
      disponibilidad: true,
    },
    {
      id: 3,
      nombre: 'Sobre de Golosinas',
      descripcion: 'Bluey',
      precio: 3500,
      img: 'img/pro2.png',
      disponibilidad: true,
    },
    {
      id: 4,
      nombre: 'Letras 3D',
      descripcion: 'Animalitos',
      precio: 15000,
      img: 'img/pro3.png',
      disponibilidad: true,
    },
    {
      id: 5,
      nombre: 'Toppers',
      descripcion: 'Princesas',
      precio: 2500,
      img: 'img/pro4.png',
      disponibilidad: true,
    },
    {
      id: 6,
      nombre: 'Toppers',
      descripcion: 'Capibara',
      precio: 20000,
      img: 'img/pro5.png',
      disponibilidad: true,
    },
    {
      id: 7,
      nombre: 'Toppers',
      descripcion: 'Princesas',
      precio: 20000,
      img: 'img/pro6.png',
      disponibilidad: true,
    },
    {
      id: 8,
      nombre: 'Libritos para colorear ',
      descripcion: 'Princesas',
      precio: 20000,
      img: 'img/pro7.png',
      disponibilidad: true,
    },
    {
      id: 9,
      nombre: 'Libritos para colorear ',
      descripcion: 'Capibara',
      precio: 20000,
      img: 'img/pro8.png',
      disponibilidad: true,
    },
    {
      id: 10,
      nombre: 'Alcancias ',
      descripcion: 'Minions',
      precio: 20000,
      img: 'img/pro9.png',
      disponibilidad: true,
    },
    {
      id: 11,
      nombre: 'Cajitas Milk ',
      descripcion: 'Capibara',
      precio: 20000,
      img: 'img/pro10.png',
      disponibilidad: true,
    },
    {
      id: 12,
      nombre: 'Cajitas Milk ',
      descripcion: 'Dinosaurios',
      precio: 20000,
      img: 'img/pro11.png',
      disponibilidad: true,
    },
  ]

  
  constructor(private carritoService: CarritoService) { }

  // Metodo para agreagr un producto al carrito
  agregar(producto: Producto) {
    this.carritoService.agregarAlCarrito(producto)
    alert('Producto agregado al carrito') //Muestra el mensaje
  }

  /*Cards tipos*/
  tipos = [
    {
      id: 1,
      img: 'img/tipo1.png',
      nombre: 'Cajitas Milk'
    },
    {
      id: 2,
      img: 'img/tipo2.png',
      nombre: 'Banderines'
    },
    {
      id: 3,
      img: 'img/tipo3.png',
      nombre: 'Toppers'
    },
    {
      id: 4,
      img: 'img/tipo4.png',
      nombre: 'Letras 3D'
    },
    {
      id: 5,
      img: 'img/tipo5.png',
      nombre: 'Imanes'
    },
    {
      id: 6,
      img: 'img/tipo6.png',
      nombre: 'Libritos Colorear'
    },
    {
      id: 7,
      img: 'img/tipo7.png',
      nombre: 'Alcancias'
    },
  ]



  @ViewChild('track') trackRef!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    this.enableDragScroll(this.trackRef.nativeElement);
  }

  scrollLeft(): void {
    this.trackRef.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.trackRef.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  enableDragScroll(container: HTMLElement): void {
    let isDown = false;
    let startX: number = 0;
    let scrollLeft: number = 0;


}
}
