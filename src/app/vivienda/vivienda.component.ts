import { Component } from '@angular/core';
import { FooterComponent } from "../layout/footer/footer.component";
import { HeaderComponent } from "../layout/header/header.component";
import { ViviendaService } from '../services/vivienda.service';
import { Vivienda } from '../models/property.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; // Asegúrate de tener el AuthService aquí

@Component({
  selector: 'app-vivienda',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './vivienda.component.html',
  styleUrls: ['./vivienda.component.css']
})
export class ViviendaComponent {
  query = ""
  maxPrecio = 0
  minPrecio = 0
  habitaciones = 0
  viviendas: Vivienda[] = []
  ordenar = ["Precio", "Habitaciones"]
  seleccion = null

  // Cambiamos authService a public para que esté accesible en la plantilla (HTML)
  constructor(public authService: AuthService, private router: Router, private viviendaService: ViviendaService) {
    this.viviendas = this.viviendaService.getViviendas();
  }

  verDetalles(id: number) {
    this.router.navigate(['/vivienda', id]);
  }

  viviendasDestacadas() {
    return this.viviendas.slice(0, 2);
  }

  buscarViviendas() {
    this.viviendas = this.viviendaService.buscarVivienda(this.query, this.minPrecio, this.maxPrecio == 0 ? Number.MAX_VALUE : this.maxPrecio, this.habitaciones, this.seleccion);
  }

  obtenerViviendas() {
    return this.viviendas;
  }

  eliminarVivienda(id: number) {
    // Verificamos si el usuario está autenticado antes de eliminar
    if (this.authService.getUser()) {
      this.viviendaService.eliminarVivienda(id);
    } else {
      alert("Debe iniciar sesión para eliminar una propiedad.");
      this.router.navigate(['/login']);
    }
  }

  actualizarVivienda(id: number) {
    this.router.navigate(['manejar-vivienda', id]);
  }
}
