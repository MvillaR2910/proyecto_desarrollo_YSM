import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  ngOnInit() {
    const storedUserData = localStorage.getItem('userProfile');
    this.userProfile = storedUserData ? JSON.parse(storedUserData) : null;
    this.isLoggedIn = !!this.userProfile; // Verifica si el usuario está logueado
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    localStorage.removeItem('userProfile');
    this.isLoggedIn = false;
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
