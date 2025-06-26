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
      nombre: 'Toppers Minions',
      descripcion: 'Toppers de torta personalizado con nombre',
      precio: 2500,
      img: 'img/pro.png',
      disponibilidad: true,
    },
    {
      id: 2,
      nombre: 'Cajitas Milk Boca',
      descripcion: 'Cajitas Milk personalizadas con personaje y nombre',
      precio: 10000,
      img: 'img/pro1.png',
      disponibilidad: true,
    },
    {
      id: 3,
      nombre: 'Sobre de Golosinas Bluey',
      descripcion: 'Personalizado con nombre',
      precio: 3500,
      img: 'img/pro2.png',
      disponibilidad: true,
    },
    {
      id: 4,
      nombre: 'Letras 3D Animalitos',
      descripcion: 'Personalizadas de diseño',
      precio: 15000,
      img: 'img/pro3.png',
      disponibilidad: true,
    },
    {
      id: 5,
      nombre: 'Toppers Princesas',
      descripcion: 'Toppers cupcake',
      precio: 2500,
      img: 'img/pro4.png',
      disponibilidad: true,
    },
    {
      id: 6,
      nombre: 'Toppers Capibara',
      descripcion: 'Toppers cupcake',
      precio: 20000,
      img: 'img/pro5.png',
      disponibilidad: true,
    },
    {
      id: 7,
      nombre: 'Toppers Princesas',
      descripcion: 'Toppers Torta',
      precio: 20000,
      img: 'img/pro6.png',
      disponibilidad: true,
    },
    {
      id: 8,
      nombre: 'Libritos para colorear Princesas',
      descripcion: 'Libritos personalizados',
      precio: 20000,
      img: 'img/pro7.png',
      disponibilidad: true,
    },
    {
      id: 9,
      nombre: 'Libritos para colorear Capibara',
      descripcion: 'Libritos personalizados',
      precio: 20000,
      img: 'img/pro8.png',
      disponibilidad: true,
    },
    {
      id: 10,
      nombre: 'Alcancias Minions',
      descripcion: 'Personalizadas con nombre y diseño',
      precio: 20000,
      img: 'img/pro9.png',
      disponibilidad: true,
    },
    {
      id: 11,
      nombre: 'Cajitas Milk Capibara',
      descripcion: 'Personalizadas con diseño y nombre',
      precio: 20000,
      img: 'img/pro10.png',
      disponibilidad: true,
    },
    {
      id: 12,
      nombre: 'Cajitas Milk Dinosaurios',
      descripcion: 'Personalizadas con diseño y nombre',
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

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - startX) * -1;
      container.scrollLeft = scrollLeft + walk;
    });
  }

}
