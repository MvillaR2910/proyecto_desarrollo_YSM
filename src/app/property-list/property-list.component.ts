// src/app/property-list/property-list.component.ts
import { Component } from '@angular/core';
import { Property } from '../models/property.model'; // Asegúrate de que la ruta sea correcta

@Component({
    selector: 'app-property-list',
    templateUrl: './property-list.component.html',
    styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {
    properties: Property[] = [
        { id: 1, title: 'Casa en el centro', description: 'Casa hermosa en el centro de la ciudad.', price: 120000 },
        { id: 2, title: 'Departamento en la playa', description: 'Departamento con vista al mar.', price: 250000 },
        // Agrega más propiedades según sea necesario
    ];

    someMethod(property: Property) {
        console.log(property.title);
        // Lógica adicional para manejar la propiedad
    }
}
