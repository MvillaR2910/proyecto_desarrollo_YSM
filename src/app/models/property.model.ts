export interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
}

interface Reserva {
    fechaInicio: string;  // Formato de fecha 'YYYY-MM-DD'
    fechaFin: string;     // Formato de fecha 'YYYY-MM-DD'
  }

export interface Vivienda {

    id: number;
    titulo: string;
    descripcion: string;
    pais: string;
    ciudad: string;
    direccion: string;
    precioNoche: number;
    numeroDeHabitaciones: number;
    banos: number;
    capacidadMaxima: number;
    fotos: string[];
    reservas:Reserva[]


}