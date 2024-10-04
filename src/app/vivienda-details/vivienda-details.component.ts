import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViviendaService } from '../services/vivienda.service';
import { Vivienda } from '../models/property.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vivienda-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vivienda-details.component.html',
  styleUrls: ['./vivienda-details.component.css']
})
export class ViviendaDetailsComponent {
  vivienda: Vivienda | null = null;

  constructor(private viviendaService: ViviendaService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const vivienda = this.viviendaService.getViviendaById(Number(id));
        if (vivienda) {
          this.vivienda = vivienda;
        }
      }
    });
  }

  // Método para validar si una imagen es válida
  isValidImage(url: string | null): boolean {
    return !!url && url.trim() !== ''; 
  }
}
