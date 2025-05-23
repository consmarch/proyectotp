import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoComponent } from '../../paginas/carrito/carrito.component';
import { CarritoService } from '../../servicios/carrito.service';
import { ProductosComponent } from '../../paginas/productos/productos.component';
import { Producto } from '../../modelos/producto.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
    cantidadProductos: number = 0;

    constructor(private carritoService: CarritoService){}

    ngOnInit(): void {
      //*escucha los cambios en el carrito paraa actualizar la cantidad total de productos*//
      this.carritoService.carrito$.subscribe((productos: { producto: Producto,cantidad : number}[]) =>{

        this.cantidadProductos = productos.reduce((total, item) => total + item.cantidad,0)//*suma la cantidad de productos

      })
    }

    onCarritoClick(){
      console.log('Carrito clicked');
    }

}
