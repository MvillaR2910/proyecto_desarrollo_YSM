import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls:['./profile.component.css']
})

export class ProfileComponent {
  userData = {
    nombre: '',
    email: '',
    bio: '',
    profile_picture: ''
  };

  ngOnInit() {
    const storedUserData = sessionStorage.getItem('usuario');
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

    localStorage.setItem(this.userData.email, JSON.stringify(this.userData));
    sessionStorage.setItem('usuario', JSON.stringify(this.userData))
    alert('Perfil actualizado exitosamente.');
  }
}
