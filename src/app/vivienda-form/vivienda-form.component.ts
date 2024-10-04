import { Component } from '@angular/core';
import { ViviendaService } from '../services/vivienda.service';
import { Vivienda } from '../models/property.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../services/supabase.service'; // Asegúrate de que la ruta de importación esté correcta

@Component({
  selector: 'app-vivienda-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vivienda-form.component.html',
  styleUrls: ['./vivienda-form.component.css']
})
export class ViviendaFormComponent {
  vivienda: Vivienda;
  update: boolean;
  selectedFile: File | null = null;  // Para almacenar la imagen seleccionada
  selectedPrincipalFile: File | null = null;  // Para almacenar la imagen principal seleccionada

  constructor(
    private viviendaService: ViviendaService,
    private route: ActivatedRoute,
    private supabaseService: SupabaseService // Inyectamos el servicio de Supabase
  ) {
    this.vivienda = {
      id: 0,
      titulo: '',
      descripcion: '',
      pais: '',
      ciudad: '',
      direccion: '',
      precioNoche: 0,
      habitaciones: 0,
      banos: 0,
      capacidadMaxima: 0,
      fotoPrincipal: '',  // Nueva propiedad
      fotos: [],
      reservas: []
    };
    this.update = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const vivienda = this.viviendaService.getViviendaById(Number(id));
        if (vivienda) {
          this.vivienda = vivienda;
          this.update = true;
        }
      }
    });
  }

  // Método para manejar la selección de imagen principal
  onPrincipalFileSelected(event: any) {
    this.selectedPrincipalFile = event.target.files[0];  // Almacena el archivo seleccionado
  }

  // Método para subir la imagen principal a Supabase
  async uploadPrincipalImage() {
    if (this.selectedPrincipalFile) {
      try {
        const path = await this.supabaseService.uploadImage(this.selectedPrincipalFile);  // Subir la imagen a Supabase
        if (path) {
          const imageUrl = await this.supabaseService.getImageUrl(path);  // Obtener la URL pública de la imagen subida
          if (imageUrl) {
            console.log('URL de la imagen principal subida:', imageUrl);  // Verificar que la URL se obtiene correctamente
            this.vivienda.fotoPrincipal = imageUrl;  // Almacenar la URL en la propiedad 'fotoPrincipal'
          } else {
            console.error('No se pudo obtener la URL pública de la imagen principal.');
          }
        }
      } catch (error) {
        console.error('Error al subir la imagen principal:', error);
      }
    }
  }

  // Método para manejar la selección de imágenes secundarias
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];  // Almacena el archivo seleccionado
  }

  // Método para subir la imagen secundaria a Supabase y guardarla en la propiedad vivienda
  async uploadImage() {
    if (this.selectedFile) {
      try {
        const path = await this.supabaseService.uploadImage(this.selectedFile);  // Subir la imagen a Supabase
        if (path) {
          const imageUrl = await this.supabaseService.getImageUrl(path);  // Obtener la URL pública de la imagen subida
          if (imageUrl) {
            console.log('URL de la imagen secundaria subida:', imageUrl);  // Asegúrate de que la URL es correcta
            this.vivienda.fotos.push(imageUrl);  // Almacenar la URL en el array de fotos
          } else {
            console.error('No se pudo obtener la URL pública de la imagen secundaria.');
          }
        }
      } catch (error) {
        console.error('Error al subir la imagen secundaria:', error);
      }
    }
  }
  
  // Método para crear o actualizar vivienda
  onSubmit(): void {
    if (this.update) {
      this.actualizarVivienda(this.vivienda.id, this.vivienda);
    } else {
      this.crearVivienda(this.vivienda);
    }
  }

  crearVivienda(vivienda: Vivienda): void {
    this.viviendaService.crearVivienda(vivienda);
  }

  actualizarVivienda(id: number, vivienda: Vivienda): void {
    this.viviendaService.actualizarVivienda(id, vivienda);
  }
}
