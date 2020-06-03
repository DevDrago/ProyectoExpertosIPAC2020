import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OpcionesAdmin } from 'src/app/interfaces/opciones-admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  token = localStorage.getItem("token");
  
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




}
