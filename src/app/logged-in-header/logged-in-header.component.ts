import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { AuthService } from '../services/auth.service';  // Importa el servicio de autenticación

@Component({
  selector: 'app-logged-in-header',
  standalone: true,
  imports: [RouterModule, CommonModule], // Asegúrate de importar el CommonModule
  templateUrl: './logged-in-header.component.html',
  styleUrls: ['./logged-in-header.component.css']
})
export class LoggedInHeaderComponent implements OnInit {
  userProfile: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.userProfile = this.authService.getUser();  // Recupera los datos del usuario
  }

  logout() {
    localStorage.removeItem('userProfile');
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/login']);
    window.location.reload(); 
  }
}
