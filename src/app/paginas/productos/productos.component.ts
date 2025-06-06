import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.model';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  Productos: Producto[] = [
    {
      id:1,
      nombre :'remera',
      descripcion:'gris modal',
      precio : 20000,
      img: 'img/logo.png',
      disponibilidad : true,
    },
  ]
  constructor(private carritoService: CarritoService){}

  // Metodo para agreagr un producto al carrito
  agregar(producto: Producto){
    this.carritoService.agregarAlCarrito(producto)
    alert('Producto agregado al carrito') //Muestra el mensaje
  }

}