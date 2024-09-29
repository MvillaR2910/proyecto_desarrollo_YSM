import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./signup/signup.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from "./layout/header/header.component"; // Verifica la ruta del header
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RouterOutlet, LoginComponent, SignupComponent, FooterComponent, HeaderComponent, FormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
