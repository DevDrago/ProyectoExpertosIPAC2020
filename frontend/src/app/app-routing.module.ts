import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService as RoleGuard } from './services/roleguard.service';

//Páginas generales
import { InicioComponent } from './components/general/inicio/inicio.component';
import { WhoweareComponent } from './components/general/whoweare/whoweare.component';
import { DocumentationComponent } from './components/general/documentation/documentation.component';
import { ContactComponent } from './components/general/contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

//Páginas del administrador
import { AdminComponent } from './components/admin/admin.component';
import { ManejoUsuariosComponent } from './components/admin/manejo-usuarios/manejo-usuarios.component';
import { ConfigInicialComponent } from './components/admin/config-inicial/config-inicial.component';

//Páginas del usuario
import { UserComponent } from './components/user/user.component';

//Páginas de código de estatus HTTP
import { Code401Component } from './statuscodes/code401/code401.component';

const routes: Routes = [
  //Rutas generales
  { path: '', component: InicioComponent },
  { path: 'whois', component: WhoweareComponent },
  { path: 'docs', component: DocumentationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  //Rutas del admin
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { tipoUsuario: 1 } },
  { path: 'admin/config-inicial', component: ConfigInicialComponent, canActivate: [RoleGuard], data: { tipoUsuario: 1 } },
  { path: 'admin/manejo-usuarios', component: ManejoUsuariosComponent, canActivate: [RoleGuard], data: { tipoUsuario: 1 } },
  //Rutas del usuario
  { path: 'user', component: UserComponent, canActivate: [RoleGuard], data: { tipoUsuario: 2 } },
  //Rutas de código de estatus HTTP
  { path: '401', component: Code401Component },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
