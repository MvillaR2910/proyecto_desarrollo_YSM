import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel
import { CommonModule } from '@angular/common'; // Importar CommonModule para *ngIf

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule], // Asegúrate de incluir FormsModule y CommonModule
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userData = {
    username: '',
    email: '',
    bio: '',
    profile_picture: ''
  };

  ngOnInit() {
    const storedUserData = localStorage.getItem('userProfile');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.userData.profile_picture = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  updateProfile() {
    localStorage.setItem('userProfile', JSON.stringify(this.userData));
    alert('Perfil actualizado exitosamente.');
  }
}
