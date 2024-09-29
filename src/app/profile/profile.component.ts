import { Component } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    nombre: string = "";
    email: string = "";

    constructor() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.nombre = user.nombre;
        this.email = user.email;
    }

    editProfile() {
        // Aquí podrías implementar la lógica para editar el perfil
    }
}
