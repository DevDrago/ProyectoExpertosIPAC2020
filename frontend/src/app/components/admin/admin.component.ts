import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  nombreAdmin:string = 'Admin';
  opcionesAdmin:any = [];
  
  constructor(private adminService:AdminService, public router: Router) { }

  ngOnInit(): void {
    this.adminService.listarOpcionesAdmin().subscribe(
      res=>{ 
        this.opcionesAdmin = res; 
        console.log(this.opcionesAdmin); 
      },
      error=>{ console.log(error) }
    );
  }


  detalleOpcion(idOpc) {
    console.log(idOpc);
    
    this.router.navigate([idOpc]);

    /*this.adminService.listarOpcionAdmin(idOpc).subscribe(
      res=>{ 
        
      },
      error=>{ console.log(error) }
    );*/
  }

}
