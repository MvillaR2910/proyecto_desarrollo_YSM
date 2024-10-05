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
    // Recuperar el usuario autenticado (si existe) cuando se inicia la aplicación
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
    if (!email || !password) {
      throw new Error("Todos los campos deben estar completos.");
    }

    const stringUsuario = localStorage.getItem(email);
    if (!stringUsuario) {
      throw new Error("Email o contraseña inválidos.");
    }

    const jsonUsuario = JSON.parse(stringUsuario);

    if (password !== jsonUsuario.password) {
      throw new Error("Email o contraseña inválidos.");
    }

    // Guardar el usuario autenticado en sessionStorage
    this.user = jsonUsuario;
    sessionStorage.setItem('usuario', JSON.stringify(this.user));
  }

  // Método para cerrar sesión
  logout() {
    this.user = null;
    sessionStorage.removeItem('usuario');
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!this.user;
  }
}
