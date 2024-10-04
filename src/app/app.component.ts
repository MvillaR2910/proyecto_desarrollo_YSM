import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from "./layout/header/header.component";
import { LoggedInHeaderComponent } from './logged-in-header/logged-in-header.component';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  standalone: true,
  imports: [
    CommonModule,  // Asegúrate de incluir CommonModule aquí
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    LoggedInHeaderComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private cd: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();

    // Detectar cambios en las rutas y verificar el estado de sesión
    this.router.events.subscribe(() => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus() {
    const storedUserData = sessionStorage.getItem('usuario');
    this.isLoggedIn = !!storedUserData; // Verifica si hay datos en sessionStorage
    this.cd.detectChanges(); // Asegura que los cambios se reflejen
  }

  updateLoginStatus() {
    this.checkLoginStatus();
  }
}
