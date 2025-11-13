import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from 'express';

@Component({
  selector: 'app-isesion',
  standalone:true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './isesion.component.html',
  styleUrl: './isesion.component.css'
})
export class IsesionComponent {

  //datos capturados desde el formulario de login
  usuario = {email: '',password:''};

  //variables para mostrar mensajes de error y estado de cargo
  error: string | null = null;

  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  //envia las credenciales al backend e inicia la sesion si son validas

  iniciaSesion(){
    this.error = null;
    this.cargando = true;

    this.authService.login(this.usuario).subscribe({

      //se ejecuta cuando el servidor devuelve una respuesta exitosa
      next: (response:any)=>{
          //el backend debe devolver: id, nombre, email, rol y token
          if(response?.token &&response?.rol){
            //guarda token y rol en localstorage
            this.authService.guardarSesion(response.token, response.rol)

            //guarda tambien los datos completos del usuario
            localStorage.setItem('usuario', JSON.stringify(response));

            //redirige segun el rol devuelto por el backend
            this.router.navigate ([
              response.rol === 'admin' ? '/admin' : '/inicio'
            ])
          }
          //si el backend devuelve un mensaje de errrpr controlado

          else if(response?.mensaje){
            this.error = response.mensaje
          }
          //si la respuesta no tiene formato esperado

        else{
          this.error = 'respuesta inesperada del servidor'
        }
        this.cargando = false
      },

      //se ejecuta cuando ocurre un error en la comunicacion con el backend
      error:(err:any) =>{
        console.error('erro al iniciar sesion:', {
          status: err.status,
          statusText: err.statusText,
          error: err.error,
          url: err.url
        });

        //se muestra  el mensaje devuelto por el backend si existe
        this.error = err.error?.mensaje || 'credencuales incorrecta o error en el servidos'

        this.cargando = false;
      }
    })
  }
}
