import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './login.service';
import { TokenStorageService } from './tokenstorage.service';

@Component({
  selector: 'app-login',
  template: `
  <h1 i18n class="jumbotron" style='text-align: center;'>Welcome to Wonda Cabinet Inc</h1>
  <h1 i18n style='text-align: center; font-weight: bold'>Login</h1>
   <div class='my-container' style="display: flex; justify-content: center; align-items: center; height: 250px;">
      <form *ngIf="!isLoggedIn" (ngSubmit)="f.form.valid && onSubmit()" name="form" #f="ngForm" novalidate>
        <div class="form-group">
          <label i18n for="username" style="font-size: 150%">Username</label>
          <input i18n-placeholder
          type="text" 
          ngModel class="form-control" 
          id="username" name="username" 
          placeholder="exampleuser" 
          style='max-width: 900px'
          [(ngModel)]="form.username"
          required
          #username="ngModel">

          <div
          i18n
          class="alert alert-danger"
          role="alert"
          *ngIf="username.errors && f.submitted"
        >
          Username is required!
        </div>
        </div>

        <div class="form-group">
        <label i18n for="password" style="font-size: 150%">Password</label>
        <input i18n-placeholder
        type="password" 
        ngModel class="form-control" 
        id="password" 
        name="password" 
        style='max-width: 900px'
        [(ngModel)]="form.password"
        required
        #password="ngModel">

        <div
          class="alert alert-danger"
          role="alert"
          *ngIf="password.errors && f.submitted"
        >
          <div i18n *ngIf="password.errors['required']">Password is required</div>
        </div>
        </div>

        <div>
          <button i18n type="submit" class="btn btn-primary mb-2" name="submit" style='margin-top: 10px; text-align: center; width: 900px;'>Login</button>
          
        </div>
        <a i18n routerLink="/forgotpassword" style="float: right; font-size: 20px;">Forgot Password</a>
        <div class="form-group">
        <div
          i18n
          class="alert alert-danger"
          role="alert"
          name="failedLogin"
          *ngIf="f.submitted && isLoginFailed"
        >
          Login failed: {{ errorMessage }}
        </div>
       </div>
      </form>
      <div i18n class="alert alert-success" name="success" *ngIf="isLoggedIn">
        Logged in as {{ roles }}.
        <a href="/home">Continue</a>
      </div>
    </div>
    <div  *ngIf="!isLoggedIn" style="display: block; margin-left: 320px">
     <h2 i18n>Don't have an account?</h2>
     <a i18n routerLink="/signup" style="font-size: 150%">Sign Up For Free</a><br><br>
     <a i18n href="/home" style="font-size: 150%">Continue as Guest</a>
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
        this.tokenStorage.saveRefreshToken(data.refreshToken);
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
