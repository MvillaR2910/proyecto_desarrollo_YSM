import { Injectable } from '@angular/core';


interface User {
  nombre: string;
  email: string;
  password: string;
  bio: string,
  profilePicture: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null;

  constructor() {
    const storedUser = sessionStorage.getItem('usuario');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  getUser(): any {
    return sessionStorage.getItem('usuario')
  }

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
  
    this.user = jsonUsuario
    sessionStorage.setItem('usuario',stringUsuario);

  }

  logout() {
    this.user = null;
    sessionStorage.removeItem('usuario');
  }
}
