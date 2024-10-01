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
  maxPrecio = 0
  minPrecio = 0
  habitaciones = 0
  viviendas: Vivienda[] = []
  ordenar = ["Precio","Habitaciones"]
  seleccion = null

  constructor(private router: Router, private viviendaService: ViviendaService) {
    this.viviendas = this.viviendaService.getViviendas()
  }

  verDetalles(id: number) {
    this.router.navigate(['/vivienda', id]);
  }

  viviendasDestacadas() {
    return this.viviendas.slice(0, 2)
  }

  buscarViviendas() {
    this.viviendas = this.viviendaService.buscarVivienda(this.query, this.minPrecio,this.maxPrecio == 0 ? Number.MAX_VALUE : this.maxPrecio,  this.habitaciones, this.seleccion)
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
