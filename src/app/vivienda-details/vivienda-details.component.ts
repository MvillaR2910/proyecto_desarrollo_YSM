import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViviendaService } from '../services/vivienda.service';
import { Vivienda } from '../models/property.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vivienda-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vivienda-details.component.html',
  styleUrl: './vivienda-details.component.css'
})
export class ViviendaDetailsComponent {
  vivienda: Vivienda|null = null;

  constructor(private viviendaService: ViviendaService, private route: ActivatedRoute) {
      // Verifica si viene un id en la ruta
      this.route.paramMap.subscribe(params => {
        if (params.get("id")) {
          const vivienda = this.viviendaService.getViviendaById(Number(params.get("id")));
          if (vivienda) {
            this.vivienda = vivienda
          }
        }
      });
  }

}
