import { Component } from '@angular/core';
import { FooterComponent } from "../layout/footer/footer.component";
import { HeaderComponent } from "../layout/header/header.component";
import { ViviendaService } from '../services/vivienda.service';
import { Vivienda } from '../models/property.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-vivienda',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule],
  templateUrl: './vivienda.component.html',
  styleUrl: './vivienda.component.css'
})
export class ViviendaComponent {
  query = ""
  viviendas: Vivienda[] = []

  constructor(private router: Router, private viviendaService: ViviendaService) {
    this.viviendas = this.viviendaService.getViviendas()
  }


  verDetalles(id: number) {
    this.router.navigate(['/vivienda', id]); // Navega a la ruta de detalles

  }
  viviendasDestacadas() {
    return this.viviendas.slice(1, 3)
  }

  buscarViviendas(event: Event) {
    this.viviendas = this.viviendaService.buscarVivienda(this.query)
  }
  obetenerViviendas() {
    return this.viviendas
  }

  eliminarVivienda(id: number) {
    this.viviendaService.eliminarVivienda(id)
  }
  actualizarVivienda(id: number) {
    this.router.navigate(['manejar-vivienda', id]);
  }
}
