import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { QuienessomosComponent } from './paginas/quienessomos/quienessomos.component';
import { CategoriasComponent } from './paginas/categorias/categorias.component';

export const routes: Routes = [

{path: '', redirectTo: '/inicio', pathMatch: 'full'},

{path: 'inicio', component:InicioComponent},
{path: 'contacto', component:ContactoComponent},
{path: 'productos', component:ProductosComponent},
{path: 'carrito', component:CarritoComponent},
{path: 'categorias', component:CategoriasComponent},
{path: 'quienessomos', component:QuienessomosComponent}

];
