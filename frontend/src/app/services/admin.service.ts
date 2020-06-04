import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OpcionesAdmin } from 'src/app/interfaces/opciones-admin';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  token = localStorage.getItem("token");
  session:any = [];
  
  backend: string = 'http://localhost:8888/api/admin';

  constructor(private httpClient:HttpClient) { }

  listarOpcionesAdmin():Observable<any>{
    return this.httpClient.get(`${this.backend}/opciones-admin`, {});
  }

  listarOpcionAdmin(idOpcion):Observable<any>{
    return this.httpClient.get(`${this.backend}/opcion-admin/${idOpcion}`,{});
  }

  crearOpcionAdmin(opcionesAdmin: OpcionesAdmin):Observable<any>{
    return this.httpClient.post(`${this.backend}/opciones-admin`, opcionesAdmin);
  }


  listarUsuarios():Observable<any>{
    return this.httpClient.get(`${this.backend}/usuarios`, {});
  }

  crearUsuario(nombreUsuario, nombre, correo, contrasenia, tipoUsuario): Observable<any> {
    return this.httpClient.post(`${this.backend}/usuarios/crear-usuario`,
    {
      nombreUsuario: nombreUsuario,
      nombre: nombre,
      correo: correo,
      contrasenia: contrasenia,
      tipoUsuario: tipoUsuario
    });
  }

  editarUsuario(idUser): Observable<any> {
    console.log(idUser);
    return this.httpClient.get(`${this.backend}/usuarios/${ idUser }`,{});
  }

}
