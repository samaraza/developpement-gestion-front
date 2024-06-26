import { LoginService } from './../services/login_service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
// import { SignInRequestModel } from 'src/app/models/RequestModel';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}


  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  submit() {
    if (this.signInForm.valid) {
      // const payload = {
      //   email: this.signInForm.get('email')?.value as string,
      //   password: this.signInForm.get('password')?.value as string
      // };

      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.signInForm.get('email')?.value as string + ':' +this.signInForm.get('password')?.value as string)
      });

      console.log("headers"+headers);

      this.signInRequest(headers);
    } else {
      this.signInForm.markAllAsTouched(); // Pour afficher les erreurs si les champs sont invalides
    }
  }

  signInRequest(headers: any) {
    this.loginService.signIn(headers).subscribe(
      (res) => {
        //console.log('res ', res);
        this.loginService.connectedUser = res;
        this.loginService.connectedUser.password=this.signInForm.get('password')?.value as string;
        console.log("userrrrrrr" + this.loginService.connectedUser.password);
        alert('Login Success');
        this.router.navigate([(this.loginService.connectedUser.role == "ADMINISTRATEUR")?'home/users':'home/labo']);
      },
      (err: HttpErrorResponse) => {
        alert(err.error);
      }
    );
  }

  get emailErrorMessage() {
    const email = this.signInForm.get('email');
    if (email?.hasError('required')) {
      return 'L\'email est requis*';
    } else if (email?.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }

  get passwordErrorMessage() {
    const password = this.signInForm.get('password');
    if (password?.hasError('required')) {
      return 'Le mot de passe est requis*';
    }
    return '';
  }
}
