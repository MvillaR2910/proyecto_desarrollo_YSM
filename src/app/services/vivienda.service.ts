import { Injectable } from '@angular/core';
import { Ordenar, Vivienda } from '../models/property.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ViviendaService {
  private viviendas: Vivienda[];
  private keyName: string;

  constructor(private supabaseService: SupabaseService) {
    this.keyName = "viviendas";
    const vivienda = localStorage.getItem(this.keyName);

    if (!vivienda) {
      this.viviendas = [
        {
          id: 1,
          titulo: "Apartamento en el centro",
          descripcion: "Un acogedor apartamento en el centro de la ciudad.",
          pais: "Colombia",
          ciudad: "Bogota",
          direccion: "Calle 10 #5-30",
          precioNoche: 100,
          habitaciones: 2,
          banos: 1,
          capacidadMaxima: 4,
          fotoPrincipal: 'https://ocmefpjbkckbnvobewre.supabase.co/storage/v1/object/public/aircnc_images/calva123@gay.com/bogota1.jpg',  
          fotos: ['https://ocmefpjbkckbnvobewre.supabase.co/storage/v1/object/public/aircnc_images/calva123@gay.com/bogota2.jpeg', 'https://ocmefpjbkckbnvobewre.supabase.co/storage/v1/object/public/aircnc_images/calva123@gay.com/bogota3.jpg'],
          reservas: [
            {
              fechaInicio: "2024-10-01",
              fechaFin: "2024-10-05"
            }
          ]
        },
        {
          id: 2,
          titulo: "Casa de campo",
          descripcion: "Hermosa casa de campo con vistas a las montañas.",
          pais: "Colombia",
          ciudad: "Medellín",
          direccion: "Vereda El Salado",
          precioNoche: 200,
          habitaciones: 3,
          banos: 2,
          capacidadMaxima: 6,
          fotoPrincipal: 'https://ocmefpjbkckbnvobewre.supabase.co/storage/v1/object/public/aircnc_images/calva123@gay.com/medellin1.jpeg?t=2024-10-05T01%3A26%3A21.284Z',
          fotos: ['https://ocmefpjbkckbnvobewre.supabase.co/storage/v1/object/public/aircnc_images/calva123@gay.com/medellin2.jpeg?t=2024-10-05T01%3A26%3A30.220Z', 'https://ocmefpjbkckbnvobewre.supabase.co/storage/v1/object/public/aircnc_images/calva123@gay.com/medellin3.jpeg?t=2024-10-05T01%3A26%3A36.503Z'],
          reservas: [
            {
              fechaInicio: "2024-11-01",
              fechaFin: "2024-11-07"
            }
          ]
        },
        {
          id: 3,
          titulo: "Casa de playa",
          descripcion: "Hermosa casa de playa con vistas al mar.",
          pais: "Colombia",
          ciudad: "Cartagena",
          direccion: "Trianon",
          precioNoche: 200,
          habitaciones: 3,
          banos: 2,
          capacidadMaxima: 6,
          fotoPrincipal: 'https://ocmefpjbkckbnvobewre.supabase.co/storage/v1/object/public/aircnc_images/calva123@gay.com/cartagena1.jpeg?t=2024-10-05T01%3A26%3A43.613Z',
          fotos: ['https://ocmefpjbkckbnvobewre.supabase.co/storage/v1/object/public/aircnc_images/calva123@gay.com/cartagena2.jpg?t=2024-10-05T01%3A26%3A49.593Z', 'https://ocmefpjbkckbnvobewre.supabase.co/storage/v1/object/public/aircnc_images/calva123@gay.com/cartagena3.jpeg?t=2024-10-05T01%3A26%3A53.792Z'],
          reservas: [
            {
              fechaInicio: "2024-11-01",
              fechaFin: "2024-11-07"
            }
          ]
        }
      ];
      localStorage.setItem(this.keyName, JSON.stringify(this.viviendas));
    } else {
      this.viviendas = JSON.parse(vivienda);
    }
  }

  getViviendas(): Vivienda[] {
    return this.viviendas;
  }

  async crearVivienda(vivienda: Vivienda): Promise<void> {
    vivienda.id = this.viviendas[this.viviendas.length - 1].id + 1;

    if (vivienda.fotoPrincipal) {
      const fotoUrl = await this.supabaseService.getImageUrl(vivienda.fotoPrincipal);
      vivienda.fotoPrincipal = fotoUrl || vivienda.fotoPrincipal;
    }

    this.viviendas.push(vivienda);
    localStorage.setItem(this.keyName, JSON.stringify(this.viviendas));
  }

  getViviendaById(id: number): Vivienda | undefined {
    return this.viviendas.find((vivienda) => vivienda.id === id);
  }

  eliminarVivienda(id: number) {
    this.viviendas = this.viviendas.filter((vivienda) => vivienda.id !== id);
    localStorage.setItem(this.keyName, JSON.stringify(this.viviendas));
  }

  actualizarVivienda(id: number, vivienda: Vivienda) {
    this.viviendas = this.viviendas.map(v => {
      if (v.id === id) {
        return vivienda;
      }
      return v;
    });
    localStorage.setItem(this.keyName, JSON.stringify(this.viviendas));
  }

  buscarVivienda(query: string, minPrecio: number, maxPrecio: number, habitaciones: number, ordenar: Ordenar | null): Vivienda[] {
    const filtroViviendas = this.viviendas.filter(vivienda => {
      const coincideDireccion = query ? vivienda.direccion.toLowerCase().includes(query.toLowerCase()) : true;
      const coincideCiudad = query ? vivienda.ciudad.toLowerCase().includes(query.toLowerCase()) : true;
      const coincidePais = query ? vivienda.pais.toLowerCase().includes(query.toLowerCase()) : true;
      const coincidePrecio = vivienda.precioNoche >= minPrecio && vivienda.precioNoche <= maxPrecio;
      const coincideHabitaciones = vivienda.habitaciones >= habitaciones;

      return (coincideDireccion || coincideCiudad || coincidePais) && coincidePrecio && coincideHabitaciones;
    });

    return this.ordenarViviendas(filtroViviendas, ordenar);
  }

  ordenarViviendas(viviendas: Vivienda[], ordenar: Ordenar | null): Vivienda[] {
    if (ordenar != null) {
      ordenar === "Precio" ? viviendas.sort((a, b) => a.precioNoche - b.precioNoche) : null;
      ordenar === "Habitaciones" ? viviendas.sort((a, b) => a.habitaciones - b.habitaciones) : null;
    }
    return viviendas;
  }
}
