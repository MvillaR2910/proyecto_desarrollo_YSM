import { Injectable } from '@angular/core';

interface User {
  nombre: string;
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;

  constructor() {
    const storedUser = sessionStorage.getItem('usuario');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  // Obtener el usuario actual
  getUser(): User | null {
    return this.user;
  }

  // Método para iniciar sesión
  onLogin(email: string, password: string) {
    const stringUsuario = localStorage.getItem(email);

    if (!stringUsuario) {
      throw new Error("Email o contraseña inválidos.");
    }

    const jsonUsuario = JSON.parse(stringUsuario);

    if (password !== jsonUsuario.password) {
      throw new Error("Email o contraseña inválidos.");
    }

    this.user = jsonUsuario;
    sessionStorage.setItem('usuario', JSON.stringify(this.user));
  }

  // Método para cerrar sesión
  logout() {
    this.user = null;
    sessionStorage.removeItem('usuario');
  }
}
