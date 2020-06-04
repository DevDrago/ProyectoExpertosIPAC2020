import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

  isLogged:boolean = false;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
