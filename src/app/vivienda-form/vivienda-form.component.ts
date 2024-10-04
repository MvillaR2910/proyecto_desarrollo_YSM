import { Component } from '@angular/core';
import { ViviendaService } from '../services/vivienda.service';
import { Vivienda } from '../models/property.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../services/supabase.service';

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
  selectedFile: File | null = null;
  selectedPrincipalFile: File | null = null;

  constructor(
    private viviendaService: ViviendaService,
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
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
      fotos: [],
      reservas: [],
      fotoPrincipal: ''  // Agregamos la propiedad de foto principal
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

  // Método para manejar la selección de imagen secundaria
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Método para manejar la selección de imagen principal
  onPrincipalFileSelected(event: any) {
    this.selectedPrincipalFile = event.target.files[0];
  }

  // Método para subir la imagen principal
  async uploadPrincipalImage() {
    if (this.selectedPrincipalFile) {
      try {
        const path = await this.supabaseService.uploadImage(this.selectedPrincipalFile);
        if (path) {
          const imageUrl = await this.supabaseService.getImageUrl(path);
          if (imageUrl) {
            this.vivienda.fotoPrincipal = imageUrl;
            console.log('URL de la imagen principal subida:', imageUrl);
          }
        }
      } catch (error) {
        console.error('Error al subir la imagen principal:', error);
      }
    }
  }

  // Método para subir imágenes secundarias
  async uploadImage() {
    if (this.selectedFile) {
      try {
        const path = await this.supabaseService.uploadImage(this.selectedFile);
        if (path) {
          const imageUrl = await this.supabaseService.getImageUrl(path);
          if (imageUrl) {
            this.vivienda.fotos.push(imageUrl);
            console.log('URL de la imagen secundaria subida:', imageUrl);
          }
        }
      } catch (error) {
        console.error('Error al subir la imagen secundaria:', error);
      }
    }
  }

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

  eliminarFoto(index: number) {
    if (index >= 0 && index < this.vivienda.fotos.length) {
      this.vivienda.fotos.splice(index, 1);
    }
  }
}
