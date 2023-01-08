import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService as guard } from './service/guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [guard], data: { expectedRole: ['admin', 'gestor'] } },
  { path: 'usuario', component: UsuarioComponent, canActivate: [guard], data: { expectedRole: ['admin', 'criador', 'editor'] } },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [guard], data: { expectedRole: ['admin', 'gestor', 'criador', 'editor'] }  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
