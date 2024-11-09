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
    habitaciones: number;
    banos: number;
    capacidadMaxima: number;
    fotos: string[];
    fotoPrincipal: string | null;  // Nueva propiedad
    reservas: Reserva[]

}

export type Ordenar = "Precio"|"Habitaciones"