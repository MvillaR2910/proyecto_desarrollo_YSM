import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  userData = {
    nombre: '',
    email: '',
    bio: '',
    profile_picture: ''
  };

  selectedFile: File | null = null;  // Almacenar el archivo de imagen seleccionado

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    const storedUserData = sessionStorage.getItem('usuario');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async updateProfile() {
    if (this.selectedFile) {
      // Subir la imagen a Supabase y obtener la URL
      const path = await this.supabaseService.uploadImage(this.selectedFile);
      if (path) {
        const imageUrl = await this.supabaseService.getImageUrl(path);
        if (imageUrl) {
          this.userData.profile_picture = imageUrl;
        }
      }
    }

    // Guardar los cambios en localStorage y sessionStorage
    localStorage.setItem(this.userData.email, JSON.stringify(this.userData));
    sessionStorage.setItem('usuario', JSON.stringify(this.userData));
    alert('Perfil actualizado exitosamente.');
  }
}
