import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from "./layout/header/header.component";
import { LoggedInHeaderComponent } from './logged-in-header/logged-in-header.component'; // Verifica la ruta
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
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
    const storedUserData = localStorage.getItem('userProfile');
    this.isLoggedIn = !!storedUserData;
    this.cd.detectChanges();
  }
}
