import { Injectable } from '@angular/core';
import { Ordenar, Vivienda } from '../models/property.model';


@Injectable({
  providedIn: 'root'
})
export class ViviendaService {
  private viviendas: Vivienda[]
  private keyName: string
  constructor() {
    this.keyName = "viviendas"
    const vivienda = localStorage.getItem(this.keyName)
    if (!vivienda) {
      this.viviendas = [
        {
          "id": 1,
          "titulo": "Apartamento en el centro",
          "descripcion": "Un acogedor apartamento en el centro de la ciudad.",
          "pais": "Colombia",
          "ciudad": "Bogota",
          "direccion": "Calle 10 #5-30",
          "precioNoche": 100,
          "habitaciones": 2,
          "banos": 1,
          "capacidadMaxima": 4,
          "fotos": ["foto1.jpg", "foto2.jpg"],
          "reservas": [
            {
              "fechaInicio": "2024-10-01",
              "fechaFin": "2024-10-05"
            },
            {
              "fechaInicio": "2024-10-10",
              "fechaFin": "2024-10-15"
            }
          ]
        },
        {
          "id": 2,
          "titulo": "Casa de campo",
          "descripcion": "Hermosa casa de campo con vistas a las montanas.",
          "pais": "Colombia",
          "ciudad": "Medellin",
          "direccion": "Vereda El Salado",
          "precioNoche": 200,
          "habitaciones": 3,
          "banos": 2,
          "capacidadMaxima": 6,
          "fotos": ["foto3.jpg", "foto4.jpg"],
          "reservas": [
            {
              "fechaInicio": "2024-11-01",
              "fechaFin": "2024-11-07"
            }
          ]
        },
        {
          "id": 3,
          "titulo": "Loft moderno",
          "descripcion": "Un loft moderno en una ubicacion exclusiva.",
          "pais": "Colombia",
          "ciudad": "Cali",
          "direccion": "Avenida Roosevelt #25-50",
          "precioNoche": 150,
          "habitaciones": 1,
          "banos": 1,
          "capacidadMaxima": 2,
          "fotos": ["foto5.jpg", "foto6.jpg"],
          "reservas": [
            {
              "fechaInicio": "2024-12-15",
              "fechaFin": "2024-12-20"
            }
          ]
        },
        {
          "id": 4,
          "titulo": "Villa frente al mar",
          "descripcion": "Villa de lujo frente al mar con piscina privada.",
          "pais": "Colombia",
          "ciudad": "Cartagena",
          "direccion": "Isla Baru, Sector Playa Blanca",
          "precioNoche": 500,
          "habitaciones": 4,
          "banos": 3,
          "capacidadMaxima": 10,
          "fotos": ["foto7.jpg", "foto8.jpg"],
          "reservas": [
            {
              "fechaInicio": "2024-09-25",
              "fechaFin": "2024-09-30"
            },
            {
              "fechaInicio": "2024-10-20",
              "fechaFin": "2024-10-25"
            }
          ]
        }
      ]


      localStorage.setItem(this.keyName, JSON.stringify(this.viviendas))
    } else {
      this.viviendas = JSON.parse(vivienda)
    }

  }

  getViviendas(): Vivienda[] {
    return this.viviendas
  }

  getViviendaById(id: number): Vivienda | undefined {
    return this.viviendas.find((vivienda) => vivienda.id == id)
  }

  crearVivienda(vivienda: Vivienda): void {
    vivienda.id = this.viviendas[this.viviendas.length - 1].id + 1
    this.viviendas.push(vivienda)
    localStorage.setItem(this.keyName, JSON.stringify(this.viviendas))
  }

  eliminarVivienda(id: number) {
    this.viviendas = this.viviendas.filter((vivienda) => vivienda.id != id)
    localStorage.setItem(this.keyName, JSON.stringify(this.viviendas))
  }

  actualizarVivienda(id: number, vivienda: Vivienda) {

    this.viviendas = this.viviendas.map(v => {
      if (v.id === id) {
        return vivienda;
      }
      return v;
    });
    localStorage.setItem(this.keyName, JSON.stringify(this.viviendas))
  }

  buscarVivienda(query: string, minPrecio: number, maxPrecio: number, habitaciones: number, ordenar: Ordenar | null): Vivienda[] {

    const filtroVivendas = this.viviendas.filter(vivienda => {
      // Comprobar que coincida con la dirección, ciudad o país
      const coincideDireccion = query ? vivienda.direccion.toLowerCase().includes(query.toLowerCase()) : true;
      const coincideCiudad = query ? vivienda.ciudad.toLowerCase().includes(query.toLowerCase()) : true;
      const coincidePais = query ? vivienda.pais.toLowerCase().includes(query.toLowerCase()) : true;

      // Verificar que la vivienda esté dentro del rango de precios
      const coincidePrecio = vivienda.precioNoche >= minPrecio && vivienda.precioNoche <= maxPrecio;

      // Verificar que el número de habitaciones coincida
      const coincideHabitaciones = vivienda.habitaciones >= habitaciones;


      // Solo devolver las viviendas que cumplan con todos los criterios
      return (coincideDireccion || coincideCiudad || coincidePais) && coincidePrecio && coincideHabitaciones;
    });

    return this.ordenarViviendas(filtroVivendas, ordenar)

  }

  ordenarViviendas(viviendas: Vivienda[], ordenar: Ordenar | null): Vivienda[] {
    if (ordenar != null) {
      ordenar === "Precio" ? viviendas.sort((a, b) => a.precioNoche - b.precioNoche) : null
      ordenar === "Habitaciones" ? viviendas.sort((a, b) => a.habitaciones - b.habitaciones) : null
    }
    return viviendas
  }

}
