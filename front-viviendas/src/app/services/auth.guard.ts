import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!this.authService.getUser(); // Verifica si el usuario está autenticado
    if (!isAuthenticated) {
      this.router.navigate(['login']); // Si no está autenticado, redirige al login
    }
    return isAuthenticated;
  }
}
