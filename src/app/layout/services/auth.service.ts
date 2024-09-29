import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Proveer a nivel global
})
export class AuthService {
  constructor() {}

  login(userData: any) {
    localStorage.setItem('userProfile', JSON.stringify(userData));
  }

  logout() {
    localStorage.removeItem('userProfile');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userProfile') !== null;
  }

  getUserProfile() {
    const storedUserData = localStorage.getItem('userProfile');
    return storedUserData ? JSON.parse(storedUserData) : null;
  }
}
