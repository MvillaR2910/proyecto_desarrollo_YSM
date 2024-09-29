import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  passwordVisible = false;

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    try {
      if (!this.email || !this.password) {
        throw new Error("Todos los campos deben estar completos.");
      }

      const stringUsuario = localStorage.getItem(this.email);
      if (!stringUsuario) {
        throw new Error("Email o contraseña inválidos.");
      }

      const jsonUsuario = JSON.parse(stringUsuario);
      if (this.password !== jsonUsuario.password) {
        throw new Error("Email o contraseña inválidos.");
      }

      localStorage.setItem(this.email, JSON.stringify({
        email: this.email, 
        password: this.password,
        profile_picture: 'url_de_imagen' 
      }));

      this.router.navigate(['/viviendas']);
    } catch (error: any) {
      alert(error.message);
    }
  }

  togglePwdVisibilidad() {
    this.passwordVisible = !this.passwordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (this.passwordVisible) {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }
}
