import { Component } from '@angular/core';
import { FooterComponent } from "../layout/footer/footer.component";
import { HeaderComponent } from "../layout/header/header.component";
import { ViviendaService } from '../services/vivienda.service';
import { vivienda } from '../models/property.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vivienda',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './vivienda.component.html',
  styleUrl: './vivienda.component.css'
})
export class ViviendaComponent {


  constructor(private router: Router, private viviendaService: ViviendaService) { }

  obetenerViviendas() {
    return this.viviendaService.getViviendas()
  }
  eliminarVivienda(id: number) {
    this.viviendaService.eliminarVivienda(id)
  }
  actualizarVivienda(id: number) {
    this.router.navigate(['manejar-vivienda', id]);
  }

}
