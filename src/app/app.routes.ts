import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { OfertasComponent } from './paginas/ofertas/ofertas.component';
import { QuienessomosComponent } from './paginas/quienessomos/quienessomos.component';

export const routes: Routes = [

{path: '', redirectTo: '/inicio', pathMatch: 'full'},

{path: 'inicio', component:InicioComponent},
{path: 'contacto', component:ContactoComponent},
{path: 'productos', component:ProductosComponent},
{path: 'carrito', component:CarritoComponent},
{path: 'ofertas', component:OfertasComponent},
{path: 'quienessomos', component:QuienessomosComponent}

];
