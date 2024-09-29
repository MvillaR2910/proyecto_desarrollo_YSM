import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ViviendaComponent } from './vivienda/vivienda.component';
import { ProfileComponent } from './profile/profile.component'; // Importa el componente de perfil

export const routes: Routes = [
    { path: '', redirectTo: '/viviendas', pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "viviendas", component: ViviendaComponent },
    { path: "profile", component: ProfileComponent }, // Añade la ruta para el perfil
    { path: '**', redirectTo: '/viviendas' }
];
