import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../login/login.service';

@Component({
  selector: 'app-signup',
  template: `
  <h1 style='text-align: center; font-weight: bold'>Sign Up Now For Free</h1>
  <div class='my-container' style="display: flex; justify-content: center; align-items: center; height: 500px;">
     <form *ngIf="!isSuccessful" name="form" (ngSubmit)="f.form.valid && onSubmit()" #f="ngForm" novalidate>
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
          minlength="3"
          maxlength="20"
          #username="ngModel">

          <div class="alert-danger" *ngIf="username.errors && f.submitted">
          <div *ngIf="username.errors['required']">Username is required</div>
          <div *ngIf="username.errors['minlength']">
            Username must be at least 3 characters
          </div>
          <div *ngIf="username.errors['maxlength']">
            Username must be at most 20 characters
          </div>
        </div>
       </div>

       <div class="form-group">
         <label for="email" style="font-size: 150%">Email</label>
         <input 
         type="email" 
         ngModel class="form-control" 
         id="email" 
         name="email" 
         placeholder="exampleuser@example.com" 
         style='max-width: 900px'
         [(ngModel)]="form.email"
          required
          email
          #email="ngModel">

          <div class="alert-danger" *ngIf="email.errors && f.submitted">
          <div *ngIf="email.errors['required']">Email is required</div>
          <div *ngIf="email.errors['email']">
            Email must be a valid email address
          </div>
        </div>
       </div>

       <div class="form-group">
       <label style="font-size: 150%">Password</label>
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

       <div class="alert-danger" *ngIf="password.errors && f.submitted">
          <div *ngIf="password.errors['required']">Password is required</div>
          <div *ngIf="password.errors['minlength']">
            Password must be at least 6 characters
          </div>
        </div>
       </div>

       <div>
         <button type="submit" class="btn btn-primary mb-2" name="submit" style='margin-top: 10px; text-align: center; width: 900px;'>Sign Up</button>
       </div>

       <div class="alert alert-warning" *ngIf="f.submitted && isSignUpFailed">
        Signup failed!<br />{{ errorMessage }}
       </div>

       <div>
         <a routerLink="/login" style="font-size: 150%"style="font-size: 150%">Back to Login</a>
       </div>
     </form>

     <div class="alert alert-success" *ngIf="isSuccessful">
      Your registration is successful!
      <a routerLink="/login" style="font-size: 150%"style="font-size: 150%">Back to Login</a>
    </div>
     
  </div>
  `,
  styles: [
  ]
})
export class SignupComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: UserAuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const { username, email, password } = this.form;

    this.authService.signup(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
