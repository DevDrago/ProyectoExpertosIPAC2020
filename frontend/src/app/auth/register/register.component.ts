import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  staticAlertClosed = false;
  errorMessage:string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(form): void {
    this.authService.register(form.value).subscribe(res => {
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
