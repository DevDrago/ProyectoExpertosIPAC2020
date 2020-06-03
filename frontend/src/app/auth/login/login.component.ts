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

  usuarios:any = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form): void {
    this.authService.login(form.value).subscribe(res => {      
      console.log('response', res);
      this.router.navigateByUrl('/admin'); //Redireccionar al Home
    },
      error=>{
        console.log(error);
    });
  }

}
