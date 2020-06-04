import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manejo-usuarios',
  templateUrl: './manejo-usuarios.component.html',
  styleUrls: ['./manejo-usuarios.component.css']
})
export class ManejoUsuariosComponent implements OnInit {

  usuarios:any = [];
  usuario:any = [];

  staticAlertClosed = false;
  errorMessage:string = '';

  nombreUsuario:any;
  nombre:any;
  correo:any;
  contrasenia:any;
  tipoUsuario:any;

  @ViewChild ('modalNuevoUsuario') modalNuevoUsuario;
  @ViewChild ('modalEditarUsuario') modalEditarUsuario;

  constructor(private modalService: NgbModal, private adminService:AdminService, private router:Router) { }

  ngOnInit(): void {
    this.adminService.listarUsuarios().subscribe(
      res=>{ 
        this.usuarios = res; 
        console.log(this.usuarios); 
      },
      error=>{ console.log(error) }
    );
  }

  nuevoUsuario() {
    this.modalService.open(this.modalNuevoUsuario, {size: 'md'});
  }

  editarUsuario(idUser) {
    this.modalService.open(this.modalEditarUsuario, {size: 'md'});
    this.datosEditarUsuario(idUser);
  }

  onCrearUsuario() {
    this.adminService.crearUsuario(
      this.nombreUsuario,
      this.nombre,
      this.correo,
      this.contrasenia,
      this.tipoUsuario
    ).subscribe(
      res=>{ 
        console.log(res);
        this.modalService.dismissAll();
        this.adminService.listarUsuarios().subscribe(
          res=>{ 
            this.usuarios = res; 
            console.log(this.usuarios); 
          },
          error=>{ console.log(error) }
        );
      },
      error=>{ 
        console.log(error); 
        this.errorMessage = error; 
        setTimeout(() => this.staticAlertClosed = true, 5000);
      })
  }

  datosEditarUsuario(idUser) {
    this.adminService.editarUsuario(
      idUser
    ).subscribe(
      res=>{ 
        console.log(res);
        this.usuario = res;
        //this.modalService.dismissAll();
      },
      error=>{ 
        console.log(error); 
        this.errorMessage = error; 
        setTimeout(() => this.staticAlertClosed = true, 5000);
      })
  }

  onEditarUsuario() {

  };

}
