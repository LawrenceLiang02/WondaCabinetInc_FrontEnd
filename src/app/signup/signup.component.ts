import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../login/login.service';

@Component({
  selector: 'app-signup',
  template: `
  <h1 i18n style='text-align: center; font-weight: bold'>Sign Up Now For Free</h1>
  <div class='my-container' style="display: flex; justify-content: center; align-items: center; height: 900px;">
     <form *ngIf="!isSuccessful" name="form" (ngSubmit)="f.form.valid && onSubmit()" #f="ngForm" novalidate>
       <div class="form-group">
        <label i18n for="firstName" style="font-size: 150%">First Name</label>

        <input
        i18n-placeholder
        type="text"
        ngModel class="form-control"
        id="firstName"
        name="firstName"
        placeholder="foo"
        [(ngModel)]="form.firstName"
        required
        minlength="2"
        maxlength="50"
        #firstName="ngModel">

        <div class="alert-danger" *ngIf="firstName.errors && f.submitted">
          <div i18n *ngIf="firstName.errors['required']">First Name is required</div>
          <div i18n *ngIf="firstName.errors['minlength']">First Name must be at least 2 characters</div>
          <div i18n *ngIf="firstName.errors['maxlength']">First Name must be at most 50 characters</div>
        </div>
       </div>

       <div class="form-group">
        <label i18n for="lastName" style="font-size: 150%">Last Name</label>

        <input
        i18n-placeholder
        type="text"
        ngModel class="form-control"
        id="lastName"
        name="lastName"
        placeholder="bar"
        [(ngModel)]="form.lastName"
        required
        minlength="2"
        maxlength="50"
        #lastName="ngModel">

        <div class="alert-danger" *ngIf="lastName.errors && f.submitted">
          <div i18n *ngIf="lastName.errors['required']">Last Name is required</div>
          <div i18n *ngIf="lastName.errors['minlength']">Last Name must be at least 2 characters</div>
          <div i18n *ngIf="lastName.errors['maxlength']">Last Name must be at most 50 characters</div>
        </div>
       </div>

       <div class="form-group">
        <label i18n for="phone" style="font-size: 150%">Phone Number</label>

        <input i18n-placeholder type="tel"
        ngModel class="form-control"
        id="phone"
        name="phone"
        placeholder="(123)-456-7890"
        [(ngModel)]="form.phone"
        required
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        #phone="ngModel">

        <div class="alert-danger" *ngIf="phone.errors && f.submitted">
          <div i18n *ngIf="phone.errors['required']">Phone Number is required</div>
          <div i18n *ngIf="phone.errors['pattern']">Incorrect phone format! Must be like 123-456-7890</div>
        </div>
       </div>

       <div class="form-group">
         <label i18n for="username" style="font-size: 150%">Username</label>

         <input 
         i18n-placeholder
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
          <div i18n *ngIf="username.errors['required']">Username is required</div>
          <div i18n *ngIf="username.errors['minlength']">
            Username must be at least 3 characters
          </div>
          <div i18n*ngIf="username.errors['maxlength']">
            Username must be at most 20 characters
          </div>
        </div>
       </div>

       <div class="form-group">
         <label i18n for="email" style="font-size: 150%">Email</label>
         <input 
         i18n-placeholder
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
          <div i18n *ngIf="email.errors['required']">Email is required</div>
          <div i18n *ngIf="email.errors['email']">
            Email must be a valid email address
          </div>
        </div>
       </div>

       <div class="form-group">
       <label i18n style="font-size: 150%">Password</label>
       <input 
       i18n-placeholder
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
          <div i18n *ngIf="password.errors['required']">Password is required</div>
          <div i18n *ngIf="password.errors['minlength']">
            Password must be at least 6 characters
          </div>
        </div>
       </div>

       <div>
         <button i18n type="submit" class="btn btn-primary mb-2" name="submit" style='margin-top: 10px; text-align: center; width: 900px;'>Sign Up</button>
       </div>

       <div i18n class="alert alert-warning" *ngIf="f.submitted && isSignUpFailed">
        Signup failed!<br />{{ errorMessage }}
       </div>

       <div>
         <a i18n routerLink="/login" style="font-size: 150%"style="font-size: 150%">Back to Login</a>
       </div>
     </form>

     <div i18n class="alert alert-success" *ngIf="isSuccessful">
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
    firstName: null,
    lastName: null,
    phone: null,
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
    const {firstName, lastName, phone, username, email, password } = this.form;

    this.authService.signup(firstName, lastName, phone, username, email, password).subscribe(
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
