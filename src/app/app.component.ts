import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./signup/signup.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from "./layout/header/header.component";

@Component({
  standalone: true,
  imports: [RouterOutlet, LoginComponent, SignupComponent, FooterComponent, HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
