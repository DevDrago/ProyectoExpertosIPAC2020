import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  staticAlertClosed = false;
  errorMessage:string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form): void {
    this.authService.login(form.value).subscribe(res => {      
      if(res['type'] == 1) {
        this.router.navigateByUrl('/admin'); //Admin
      }
      else {
        this.router.navigateByUrl('/user'); //User
      }
    }, error => { 
      this.errorMessage = error; 
      setTimeout(() => this.staticAlertClosed = true, 5000);
    });
  }

}
