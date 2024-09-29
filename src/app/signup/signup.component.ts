import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../layout/footer/footer.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormsModule, FooterComponent],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})
export class SignupComponent {
    nombre = ""
    email = ""
    pwd = ""
    confirmarPwd = ""
    passwordVisible = false

    constructor(private router: Router) { }

    onSignUp() {
        
        try {
            // Validar campos vacíos
            if (!this.nombre || !this.email || !this.pwd || !this.confirmarPwd) {
                throw new Error("Todos los campos deben estar completos.");
            }

            // Verificar si el this.email ya está registrado
            if (localStorage.getItem(this.email)) {
                throw new Error("Email no disponible.");
            }

            // Verificar que las contraseñas coincidan
            if (this.pwd !== this.confirmarPwd) {
                throw new Error("Las contraseñas deben coincidir.");
            }

            // Validar this.nombre de usuario
            const nombreRegex = /^[A-Za-z][A-Za-z0-9]{7,14}$/;
            if (!nombreRegex.test(this.nombre)) {
                throw new Error("El this.nombre de usuario debe tener entre 8 y 15 caracteres, comenzar con una letra, y solo puede contener letras y números sin espacios.");
            }

            // Validar contraseña
            const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}$/;
            if (!pwdRegex.test(this.pwd)) {
                throw new Error("La contraseña debe tener entre 12 y 20 caracteres, e incluir al menos una letra mayúscula, una letra minúscula, un número, y un carácter especial (ejemplo: @$!%*?&).");
            }

            // Guardar datos del usuario en localStorage
            const datosUsuario = {
                nobre: this.nombre,
                password: this.pwd
            };
            localStorage.setItem(this.email, JSON.stringify(datosUsuario));

            // Redirigir al home después de un registro exitoso
            this.router.navigate(["home"]);

        } catch (error: any) {
            alert(error.message);
        }
    }

    togglePwdVisibilidad(event:Event,pwd:string) {
        
        this.passwordVisible = !this.passwordVisible;
        const passwordField = document.getElementById(pwd) as HTMLInputElement;
        if (this.passwordVisible) {
          passwordField.type = 'text';
        } else {
          passwordField.type = 'password';
        }
      }


}