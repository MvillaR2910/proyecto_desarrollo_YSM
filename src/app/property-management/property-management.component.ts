import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-management',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './property-management.component.html',
  styleUrls: ['./property-management.component.css']
})
export class PropertyManagementComponent {

  propertyName: string = '';
  propertyDescription: string = '';

  // Define la función para manejar el formulario
  onManage() {
    // Aquí puedes agregar la lógica para gestionar las propiedades
    console.log('Propiedad guardada:', this.propertyName, this.propertyDescription);
  }
}
