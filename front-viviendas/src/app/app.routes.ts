import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component'; 
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ViviendaComponent } from './vivienda/vivienda.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component'; 
import { ViviendaFormComponent } from './vivienda-form/vivienda-form.component';
import { ViviendaDetailsComponent } from './vivienda-details/vivienda-details.component';
import { AuthGuard } from './services/auth.guard';  // Importamos el AuthGuard

export const routes: Routes = [
    { path: '', redirectTo: '/viviendas', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },  // Protegemos esta ruta
    { path: 'signup', component: SignupComponent },
    { path: 'viviendas', component: ViviendaComponent },
    { path: 'manejar-vivienda', component: ViviendaFormComponent, canActivate: [AuthGuard] },  // Protegemos esta ruta
    { path: 'manejar-vivienda/:id', component: ViviendaFormComponent, canActivate: [AuthGuard] }, // Protegemos esta ruta
    { path: 'dashboard', component: UserDashboardComponent }, 
    { path: 'vivienda/:id', component: ViviendaDetailsComponent }, 
    { path: '**', redirectTo: '/viviendas' }
];
