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

  constructor(private router: Router, private authService: AuthService) { }

  onLogin() {
    try {
      this.authService.onLogin(this.email,this.password)
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
