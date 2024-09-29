import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule para standalone

@Component({
  selector: 'app-logged-in-header',
  standalone: true,  // Marcar como standalone
  imports: [RouterModule], // Asegúrate de importar RouterModule
  templateUrl: './logged-in-header.component.html',
  styleUrls: ['./logged-in-header.component.css']
})
export class LoggedInHeaderComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('userProfile');
    this.router.navigate(['/login']);
  }
}
