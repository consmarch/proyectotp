import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { link } from 'node:fs';
import { Producto } from '../../modelos/producto.model';
import { CarritoComponent } from '../carrito/carrito.component';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-productos',
  imports: [NgFor, NgIf,NgClass], /* DECLARO */
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

/* declaro productos y las variables*/

 productos = [

   {
    id:1,
    img:'https://sublitextil.com.ar/wp-content/uploads/2019/01/Remera-sublimar-hombre-.jpg', 
    nombre: 'remera blanca', 
    precio: 22
  },
  {
    id:2,
  img:'https://http2.mlstatic.com/D_930720-MLA48164080171_112021-O.jpg',
     nombre: 'Gorra',
      precio: 22
    },
  {
    id:3,
    img:'https://briganti.com.ar/cdn/shop/files/HXIM09525091_7ebf8ab5-f1f0-4343-af42-64ae4ff6e2e4_800x.jpg?v=1705931954', 
    nombre: 'remera gris', 
    precio: 22
  },


  ]


 // constructor(private carritoService: CarritoService){}
  //*metodo para agregar producto al carrito}

  //agregar(producto: Producto){
    //this.carritoService.agregarAlCarrito(producto)
    //alert('Producto agregado al carrito')
    //*muestra el mensaje*// }

}
