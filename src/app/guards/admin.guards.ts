import { Injectable } from '@angular/core';

// Importa CanActivate (interfaz usada para proteger rutas) y Router (para redireccionar)
import { CanActivate, Router } from '@angular/router';

// Importa el servicio de autenticación que contiene la lógica para verificar roles de usuario
import { AuthService } from '../servicios/auth.service';

// Declara la clase como inyectable y disponible en toda la aplicación
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  // Inyección de dependencias:
  // - AuthService: para comprobar si el usuario tiene rol de administrador
  // - Router: para redirigir al usuario si no tiene permiso
  constructor(private authService: AuthService, private router: Router) {}

  // Método obligatorio de la interfaz CanActivate, que decide si se puede acceder a una ruta
  canActivate(): boolean {
    // Verifica si el usuario es administrador mediante el método del servicio de autenticación
    if (this.authService.esAdmin()) {
      // Si el usuario tiene rol de administrador, se permite el acceso
      return true;
    } else {
      // Si no es administrador, muestra un mensaje de alerta
      alert('Acceso denegado. Solo administradores pueden entrar aquí.');

      // Redirige al usuario a la página de inicio
      this.router.navigate(['/inicio']);

      // Devuelve false para bloquear el acceso a la ruta
      return false;
    }
  }
}