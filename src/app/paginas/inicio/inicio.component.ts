import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, MatGridListModule ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})


export class InicioComponent {
  

}
