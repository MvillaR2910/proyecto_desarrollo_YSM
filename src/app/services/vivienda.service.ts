import { Injectable } from '@angular/core';
import { vivienda } from '../models/property.model';


@Injectable({
    providedIn: 'root'
})
export class ViviendaService {
    private viviendas: vivienda[]
    private keyName: string
    constructor() {
        this.keyName = "viviendas"
        const vivienda = localStorage.getItem(this.keyName)
        if (!vivienda) {
            this.viviendas = [{
                id: 1,
                direccion: "sasda",
                ciudad: "París",
                pais: "Francia",
                imgUrl: "../images/paris.jpeg",
                precioNoche: 641

            }, {
                id: 2,
                direccion: "sasda",
                ciudad: "Tokyo",
                pais: "Japón",
                imgUrl: "../images/tokyo.jpeg",
                precioNoche: 521

            }, {
                id: 3,
                direccion: "sasda",
                ciudad: "New York",
                pais: "Estados Unidos",
                imgUrl: "../images/york.jpeg",
                precioNoche: 213

            }, {
                id: 4,
                direccion: "Casa en la montaña",
                ciudad: "Pig City",
                pais: "La Marranera",
                imgUrl: "../images/montain.jpeg",
                precioNoche: 120
            }]
            localStorage.setItem(this.keyName, JSON.stringify(this.viviendas))
        } else {
            this.viviendas = JSON.parse(vivienda)
        }

    }

    getViviendas(): vivienda[] {
        return this.viviendas
    }

    getViviendaById(id: number): vivienda | undefined {
        return this.viviendas.find((vivienda) => vivienda.id == id)
    }

    crearVivienda(vivienda: vivienda): void {
        vivienda.id = this.viviendas[this.viviendas.length-1].id+1
        this.viviendas.push(vivienda)
        localStorage.setItem(this.keyName, JSON.stringify(this.viviendas))
    }

    eliminarVivienda(id: number) {
        this.viviendas = this.viviendas.filter((vivienda) => vivienda.id != id)
        localStorage.setItem(this.keyName, JSON.stringify(this.viviendas))
    }

    actualizarVivienda(id: number, vivienda: vivienda) {
        
        this.viviendas = this.viviendas.map(v => {
            if (v.id === id) {
              return vivienda;  
            }
            return v;  
          });
        localStorage.setItem(this.keyName, JSON.stringify(this.viviendas))
    }

    buscarVivienda(query: string): vivienda[] {
        return this.viviendas.filter(vivienda => {

            const coincideDireccion = query ? vivienda.direccion.toLowerCase().includes(query.toLowerCase()) : true;
            const coincideCiudad = query ? vivienda.ciudad.toLowerCase().includes(query.toLowerCase()) : true;
            const coincidePais = query ? vivienda.pais.toLowerCase().includes(query.toLowerCase()) : true;

            return coincideDireccion || coincideCiudad || coincidePais;
        });
    }

}
