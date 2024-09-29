import { Component } from '@angular/core';

@Component({
    selector: 'app-property-management',
    templateUrl: './property-management.component.html',
    styleUrls: ['./property-management.component.css']
})
export class PropertyManagementComponent {
    properties = [];

    constructor() {
        this.loadProperties();
    }

    loadProperties() {
        // Cargar propiedades desde localStorage o un servicio
        this.properties = JSON.parse(localStorage.getItem('properties') || '[]');
    }

    addProperty() {
        // Implementar lógica para añadir propiedades
    }

    editProperty(id: number) {
        // Implementar lógica para editar propiedades
    }

    deleteProperty(id: number) {
        // Implementar lógica para eliminar propiedades
    }
}
