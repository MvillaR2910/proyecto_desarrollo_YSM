import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { FooterComponent } from "../layout/footer/footer.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormsModule, RouterModule, FooterComponent], // Agrega RouterModule aquí
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class SignupComponent {
    nombre = "";
    email = "";
    pwd = "";
    confirmarPwd = "";
    passwordVisible = false;

    constructor(private router: Router) { }

    onSignUp() {
        try {
            // Validar campos vacíos
            if (!this.nombre || !this.email || !this.pwd || !this.confirmarPwd) {
                throw new Error("Todos los campos deben estar completos.");
            }

            // Verificar si el email ya está registrado
            if (localStorage.getItem(this.email)) {
                throw new Error("Email no disponible.");
            }

            // Verificar que las contraseñas coincidan
            if (this.pwd !== this.confirmarPwd) {
                throw new Error("Las contraseñas deben coincidir.");
            }

            // Validar nombre de usuario
            const nombreRegex = /^[A-Za-z][A-Za-z0-9]{3,14}$/;
            if (!nombreRegex.test(this.nombre)) {
                throw new Error("El nombre de usuario debe tener entre 4 y 15 caracteres, comenzar con una letra, y solo puede contener letras y números sin espacios.");
            }

            // Validar contraseña
            const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}$/;
            if (!pwdRegex.test(this.pwd)) {
                throw new Error("La contraseña debe tener entre 12 y 20 caracteres, e incluir al menos una letra mayúscula, una letra minúscula, un número, y un carácter especial (ejemplo: @$!%*?&).");
            }

            // Guardar datos del usuario en localStorage
            const datosUsuario = {
                email:this.email,
                nombre: this.nombre,
                password: this.pwd
            };
            localStorage.setItem(this.email, JSON.stringify(datosUsuario));

            // Redirigir al home después de un registro exitoso
            this.router.navigate(["home"]);

        } catch (error: any) {
            alert(error.message);
        }
    }

    togglePwdVisibilidad(event: Event, pwd: string) {
        this.passwordVisible = !this.passwordVisible;
        const passwordField = document.getElementById(pwd) as HTMLInputElement;
        passwordField.type = this.passwordVisible ? 'text' : 'password';
    }
}
