import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./signup/signup.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from "./layout/header/header.component";
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule

@Component({
  standalone: true,
  imports: [RouterOutlet, LoginComponent, SignupComponent, FooterComponent, HeaderComponent, FormsModule], // Incluye FormsModule aquí
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
