import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { RoleGuardService as RoleGuard } from './services/roleguard.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

//Páginas generales
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { InicioComponent } from './components/general/inicio/inicio.component';
import { WhoweareComponent } from './components/general/whoweare/whoweare.component';
import { DocumentationComponent } from './components/general/documentation/documentation.component';
import { ContactComponent } from './components/general/contact/contact.component';

//Páginas del administrador
import { AdminComponent } from './components/admin/admin.component';
import { AdminheaderComponent } from './components/admin/adminheader/adminheader.component';
import { AdminfooterComponent } from './components/admin/adminfooter/adminfooter.component';
import { ManejoUsuariosComponent } from './components/admin/manejo-usuarios/manejo-usuarios.component';
import { ConfigInicialComponent } from './components/admin/config-inicial/config-inicial.component';

//Páginas del usuario
import { UserComponent } from './components/user/user.component';

//Páginas de código de estatus HTTP
import { Code401Component } from './statuscodes/code401/code401.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    UserComponent,
    Code401Component,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    WhoweareComponent,
    DocumentationComponent,
    ContactComponent,
    AdminheaderComponent,
    AdminfooterComponent,
    ManejoUsuariosComponent,
    ConfigInicialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
      },
    })
  ],
  providers: [
    RoleGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
