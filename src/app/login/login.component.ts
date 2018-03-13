import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../models/auth.model';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'ngx-cookie';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginModel: LoginModel;
  errorMessage: string;
  errorStatusCode: number;

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {
    this.loginModel = {
      username: null,
      password: null
    };
    this.createForm(this.loginModel);
  }

  ngOnInit() {
  }

  createForm(loginModel: LoginModel) {
    this.loginForm = new FormGroup({
      username: new FormControl(loginModel.username, Validators.required),
      password: new FormControl(loginModel.password, [Validators.required] )
    });
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.loginModel.username = this.loginForm.get('username').value;
      this.loginModel.password = this.loginForm.get('password').value;
    }
    this.authService.Organisation_users_login(this.loginModel).subscribe(
      data => {
        // console.log('cookie', this.cookieService.get('sessionid'));
        console.log('login component res', data);
        this.router.navigateByUrl('/branch');
      },
      (error: HttpErrorResponse) => {
        console.log('login error', error);
        console.log('error status', this.errorStatusCode);
        console.log('error message', this.errorMessage);
      });
  }

}
