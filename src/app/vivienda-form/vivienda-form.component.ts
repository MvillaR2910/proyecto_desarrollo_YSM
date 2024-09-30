import { Component } from '@angular/core';
import { ViviendaService } from '../services/vivienda.service';
import { vivienda } from '../models/property.model';
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
  id = 0
  pais = "";
  direccion = "";
  ciudad = "";
  imgUrl = "";
  precioNoche = 0;
  update=false

  constructor(private viviendaService: ViviendaService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Verifica si viene un id en la ruta
    this.route.paramMap.subscribe(params => {
      if (params.get("id")){
        const vivienda = this.viviendaService.getViviendaById(Number(params.get("id")));
        if (vivienda) {
          this.id = Number(params.get("id"))
          this.pais = vivienda.pais;
          this.direccion = vivienda.direccion;
          this.ciudad = vivienda.ciudad;
          this.imgUrl = vivienda.imgUrl;
          this.precioNoche = vivienda.precioNoche;
          this.update = true
        }
      }      

    });
  }


  onSubmit(): void {

    const vivienda: vivienda = {
      id: this.id,
      pais: this.pais,
      direccion: this.direccion,
      ciudad: this.ciudad,
      imgUrl: this.imgUrl,
      precioNoche: this.precioNoche
    }

    if (this.update) {
      this.actualizarVivienda(vivienda.id,vivienda);
    } else {
      this.crearVivienda(vivienda);
    }
  }

  crearVivienda(vivienda:vivienda): void {
    this.viviendaService.crearVivienda(vivienda)
  }
  
  actualizarVivienda(id:number,vivienda:vivienda): void {
    
    this.viviendaService.actualizarVivienda(id,vivienda)
  }
}
