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
    const storedUser = this.authService.getUser();
    console.log(storedUser); // Verificar si los datos se están obteniendo correctamente
    if (storedUser) {
      this.userProfile = JSON.parse(storedUser);
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
    window.location.reload(); // Recargar para actualizar el estado visual
  }
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu') && this.menuOpen) {
      this.menuOpen = false;
    }
  }
}
