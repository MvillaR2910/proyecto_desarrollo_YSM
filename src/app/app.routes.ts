import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ViviendaComponent } from './vivienda/vivienda.component';

export const routes: Routes = [
    { path: '', redirectTo: '/viviendas', pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "viviendas", component: ViviendaComponent },
    { path: '**', redirectTo: '/viviendas' }

];
