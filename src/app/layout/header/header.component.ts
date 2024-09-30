import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Usamos el AuthService

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isLoggedIn = false;
  userProfile: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtener el usuario del servicio, pero debemos convertir el string del sessionStorage a JSON
    const storedUser = this.authService.getUser();
    if (storedUser) {
      this.userProfile = JSON.parse(storedUser); // Parseamos el string
      this.isLoggedIn = true; // Si hay usuario, marcamos como logueado
    } else {
      this.isLoggedIn = false; // Si no hay usuario, no está logueado
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout(); // Usar el método logout del AuthService
    window.location.reload(); // Refresca la página para actualizar el menú
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu') && this.menuOpen) {
      this.menuOpen = false;
    }
  }
}
