import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-logged-in-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './logged-in-header.component.html',
  styleUrls: ['./logged-in-header.component.css']
})
export class LoggedInHeaderComponent implements OnInit {
  userProfile: any;
  isMenuOpen = false;  // Estado para manejar el menú hamburguesa

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.userProfile = this.authService.getUser();  // Recupera los datos del usuario
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;  // Alternar estado del menú hamburguesa
  }

  logout() {
    localStorage.removeItem('userProfile');
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/login']);
    window.location.reload(); 
  }
}
