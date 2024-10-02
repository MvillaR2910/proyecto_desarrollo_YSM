import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from "./layout/header/header.component";
import { LoggedInHeaderComponent } from './logged-in-header/logged-in-header.component'; // Verifica la ruta
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    LoggedInHeaderComponent,  // Asegúrate de importar el componente correctamente
    FormsModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    const storedUserData = sessionStorage.getItem('usuario');
    this.isLoggedIn = !!storedUserData; // Verifica si hay datos en sessionStorage
    this.cd.detectChanges(); // Asegura que los cambios se reflejen
  }

  // Método para actualizar el estado de inicio de sesión
  updateLoginStatus() {
    const storedUserData = sessionStorage.getItem('usuario');
    this.isLoggedIn = !!storedUserData;
    this.cd.detectChanges();
  }
}
