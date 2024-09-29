import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  passwordVisible = false;

  constructor(private router: Router) { }

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

      // Redirigir al home después de un inicio de sesión exitoso
      this.router.navigate(['home']);


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
