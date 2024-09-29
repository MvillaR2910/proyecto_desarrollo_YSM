import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component'; // Ajusta la ruta según tu estructura de carpetas
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ViviendaComponent } from './vivienda/vivienda.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component'; // Importa el nuevo componente

export const routes: Routes = [
    { path: '', redirectTo: '/viviendas', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: "profile", component: ProfileComponent }, 
    { path: 'signup', component: SignupComponent },
    { path: 'viviendas', component: ViviendaComponent },
    { path: 'dashboard', component: UserDashboardComponent }, // Nueva ruta para el componente de usuario registrado
    { path: '**', redirectTo: '/viviendas' }
];
