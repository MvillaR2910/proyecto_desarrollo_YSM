import { Component } from '@angular/core';
import { ViviendaService } from '../services/vivienda.service';
import { Vivienda } from '../models/property.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vivienda-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vivienda-form.component.html',
  styleUrl: './vivienda-form.component.css'
})
export class ViviendaFormComponent {
  vivienda: Vivienda
  update: boolean

  constructor(private viviendaService: ViviendaService, private route: ActivatedRoute) {
    this.vivienda = {
      id: 0,
      titulo: "",
      descripcion: "",
      pais: "",
      ciudad: "",
      direccion: "",
      precioNoche: 0,
      habitaciones: 0,
      banos: 0,
      capacidadMaxima: 0,
      fotos: [],
      reservas: []
    };
    this.update = false
  }
  ngOnInit() {
    // Verifica si viene un id en la ruta
    this.route.paramMap.subscribe(params => {
      if (params.get("id")) {
        const vivienda = this.viviendaService.getViviendaById(Number(params.get("id")));
        if (vivienda) {
          this.vivienda = vivienda
          this.update = true
        }
      }

    });
  }


  onSubmit(): void {
    if (this.update) {
      this.actualizarVivienda(this.vivienda.id, this.vivienda);
    } else {
      this.crearVivienda(this.vivienda);
    }
  }


   // Método para agregar una nueva foto
   agregarFoto() {
    this.vivienda.fotos.push(''); // Agregar un nuevo campo vacío para la foto
  }

  // Método para eliminar una foto
  eliminarFoto(index: number) {
    this.vivienda.fotos.splice(index, 1); // Eliminar la foto en el índice especificado
  }

  crearVivienda(vivienda: Vivienda): void {
    this.viviendaService.crearVivienda(vivienda)
  }

  actualizarVivienda(id: number, vivienda: Vivienda): void {

    this.viviendaService.actualizarVivienda(id, vivienda)
  }
}
