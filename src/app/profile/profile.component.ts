import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userName: string = '';  // Define variables para enlazar con ngModel
  userEmail: string = '';

  // Define la función que se llamará al enviar el formulario
  onUpdateProfile() {
    // Aquí puedes agregar la lógica para actualizar el perfil
    console.log('Perfil actualizado:', this.userName, this.userEmail);
  }
}
