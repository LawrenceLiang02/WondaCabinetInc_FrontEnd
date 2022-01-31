import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './login.service';
import { TokenStorageService } from './tokenstorage.service';

@Component({
  selector: 'app-login',
  template: `
  <h1 class="jumbotron" style='text-align: center; font-weight: bold'>Welcome to Wonda Cabinet Inc</h1>
  <h1 style='text-align: center; font-weight: bold'>Login</h1>
   <div class='my-container' style="display: flex; justify-content: center; align-items: center; height: 500px;">
      <form *ngIf="!isLoggedIn" (ngSubmit)="f.form.valid && onSubmit()" name="form" #f="ngForm" novalidate>
        <div class="form-group">
          <label for="username" style="font-size: 150%">Username</label>
          <input 
          type="text" 
          ngModel class="form-control" 
          id="username" name="username" 
          placeholder="exampleuser" 
          style='max-width: 900px'
          [(ngModel)]="form.username"
          required
          #username="ngModel">

          <div
          class="alert alert-danger"
          role="alert"
          *ngIf="username.errors && f.submitted"
        >
          Username is required!
        </div>
        </div>

        <div class="form-group">
        <label for="password" style="font-size: 150%">Password</label>
        <input 
        type="password" 
        ngModel class="form-control" 
        id="password" 
        name="password" 
        style='max-width: 900px'
        [(ngModel)]="form.password"
        required
        minlength="6"
        #password="ngModel">

        <div
          class="alert alert-danger"
          role="alert"
          *ngIf="password.errors && f.submitted"
        >
          <div *ngIf="password.errors['required']">Password is required</div>
          <div *ngIf="password.errors['minlength']">
            Password must be at least 6 characters
          </div>
        </div>
        </div>

        <div>
          <button type="submit" class="btn btn-primary mb-2" name="submit" style='margin-top: 10px; text-align: center; width: 900px;'>Login</button>
        </div>

        <div class="form-group">
        <div
          class="alert alert-danger"
          role="alert"
          *ngIf="f.submitted && isLoginFailed"
        >
          Login failed: {{ errorMessage }}
        </div>
       </div>
      </form>
      <div class="alert alert-success" *ngIf="isLoggedIn">
        Logged in as {{ roles }}.
        <a href="#">Continue</a>
      </div>
    </div>
    <div  *ngIf="!isLoggedIn" style="display: block; margin-left: 510px">
     <h1>Don't have an account?</h1>
     <a routerLink="/signup" style="font-size: 150%">Sign Up For Free</a><br><br>
     <a href="#" style="font-size: 150%">Continue as Guest</a>
    </div>

  
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: UserAuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
