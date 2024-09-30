export interface Property {
    id: number; 
    title: string;
    description: string;
    price: number;
}


export interface vivienda {
    id: number;
    pais: string;
    direccion: string;
    ciudad: string;
    imgUrl: string;
    precioNoche: number;
}