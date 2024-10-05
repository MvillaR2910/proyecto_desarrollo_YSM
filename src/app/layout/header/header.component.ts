import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isLoggedIn = false;
  userProfile: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const storedUser = this.authService.getUser(); 
    this.isLoggedIn = !!storedUser; // Usamos una forma segura para verificar si hay un usuario logueado
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);  // Redirigir a la página de inicio después de cerrar sesión
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu') && !target.closest('.dropdown') && this.menuOpen) {
      this.menuOpen = false;
    }
  }
}
