<<<<<<< HEAD
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
>>>>>>> c7a542c0177d95ea2c91395b14dae53794b59805

@Component({
  selector: 'app-header',
  standalone: true, // Hacerlo standalone
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
<<<<<<< HEAD
  menuOpen = false;
  isLoggedIn = false;
  userProfile: any;

  ngOnInit() {
    const storedUserData = localStorage.getItem('userProfile');
    this.userProfile = storedUserData ? JSON.parse(storedUserData) : null;
    this.isLoggedIn = !!this.userProfile; // Verifica si el usuario está logueado
  }
=======
  isLoggedIn = false;
>>>>>>> c7a542c0177d95ea2c91395b14dae53794b59805

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUserData = localStorage.getItem('userProfile');
    this.isLoggedIn = !!storedUserData;
  }

  logout() {
    localStorage.removeItem('userProfile');
    this.isLoggedIn = false;
<<<<<<< HEAD
    window.location.reload(); // Refresca la página para actualizar el menú
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu') && this.menuOpen) {
      this.menuOpen = false;
    }
=======
    this.router.navigate(['/login']);
>>>>>>> c7a542c0177d95ea2c91395b14dae53794b59805
  }
}
