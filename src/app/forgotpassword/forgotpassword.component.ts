import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../login/login.service';

@Component({
  selector: 'app-forgotpassword',
  template: `
  <h1 class="jumbotron" style='text-align: center; font-weight: bold'>Reset your Password</h1>
  <h1 style='text-align: center; font-weight: bold'>Get a password token to reset your password and then set your new password</h1>
  <div class='my-container' style="display: flex; justify-content: center; align-items: center; height: 250px;">
  
  <form *ngIf="!isRequestTokenSuccess" (ngSubmit)="f.form.valid && onSubmitTokenRequest()" name="form" #f="ngForm" novalidate>
    <div class="form-group">
      <label for="email" style="font-size: 150%">Email</label>
      <input type="email"
      ngModel class="form-control"
      id="email"
      name="email"
      placeholder="example@email.com" 
      style='max-width: 900px'
      [(ngModel)]="form.email"
      required
      #email="ngModel">

      <div
          class="alert alert-danger"
          role="alert"
          *ngIf="email.errors && f.submitted"
        >
          Email is required!
        </div>
    </div>

    <div>
      <button type="submit" class="btn btn-primary mb-2" name="submit" style='margin-top: 10px; text-align: center; width: 900px;'>Send Password Token Email</button>
    </div>
    
    <div class="form-group">
      <div
      class="alert alert-danger"
      role="alert"
      name="failedTokenSend"
      *ngIf="f.submitted && isRequestTokenFailed"
      >
      Token could not be sent due to: {{ errorMessage }}
      </div>
    </div>
    
  </form>

  <div class="alert alert-success" name="success" *ngIf="isRequestTokenSuccess && !isResetPasswordSuccess">
    Token sent to {{ form.email }}.
    </div>
  </div>

<div class='my-container' style="display: flex; justify-content: center; align-items: center;">
  <form *ngIf="!isResetPasswordSuccess && isRequestTokenSuccess" (ngSubmit)="f.form.valid && onSubmitPasswordReset()" name="form2" #f="ngForm" novalidate>
    <div class="form-group">
      <label for="passwordToken" style="font-size: 150%">Password Token</label>
      <input type="text"
      ngModel class="form-control"
      id="passwordToken"
      name="passwordToken"
      placeholder="password token received from email" 
      style='max-width: 900px'
      [(ngModel)]="form2.passwordToken"
      required
      #passwordToken="ngModel">

      <div
      class="alert alert-danger"
      role="alert"
      *ngIf="passwordToken.errors && f.submitted"
      >
      Token is required!
      </div>
   </div>

   <div class="form-group">
      <label for="newPassword" style="font-size: 150%">New Password</label>
      <input type="password"
      ngModel class="form-control"
      id="newPassword"
      name="newPassword"
      style='max-width: 900px'
      [(ngModel)]="form2.newPassword"
      required
      minlength="6"
      #newPassword="ngModel">

      <div class="alert-danger" *ngIf="newPassword.errors && f.submitted">
          <div *ngIf="newPassword.errors['required']">New Password is required</div>
          <div *ngIf="newPassword.errors['minlength']">
            Password must be at least 6 characters
          </div>
        </div>
   </div>

   <div class="form-group">
      <div
      class="alert alert-danger"
      role="alert"
      name="failedUpdateSend"
      *ngIf="f.submitted && isResetPasswordFailed"
      >
      {{ form2.passwordToken }} Password Update failed due to: {{ errorMessage }}
      </div>
    </div>

   <div>
   <button type="submit" class="btn btn-primary mb-2" name="submit" style='margin-top: 10px; text-align: center; width: 900px;'>Reset Password</button>
   </div>
  
  </form>

  <div class="alert alert-success" name="success" *ngIf="isResetPasswordSuccess">
    Password updated successfully.
    <a routerLink="/login" style="font-size: 150%">Back To Login</a>
  </div>
</div>
  
  `,
  styles: [
  ]
})
export class ForgotpasswordComponent implements OnInit {

  form: any = {
    email: null
  };
  form2: any = {
    passwordToken: null,
    newPassword: null
  };
  isRequestTokenFailed = false;
  isResetPasswordFailed = false;
  isRequestTokenSuccess = false;
  isResetPasswordSuccess = false;
  errorMessage = '';
  constructor(private authService: UserAuthService) { }

  ngOnInit(): void {
  }

  onSubmitTokenRequest(){
    const {email} = this.form;
    this.authService.passwordToken(email).subscribe(
      data => {
        this.isRequestTokenSuccess = true;
        this.isRequestTokenFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isRequestTokenFailed = true;
        this.isRequestTokenSuccess = false;
      }
    )
  }

  onSubmitPasswordReset(){
    const{passwordToken, newPassword} = this.form2;
    this.authService.resetPassword(passwordToken, newPassword).subscribe(
      data => {
        this.isResetPasswordSuccess = true;
        this.isResetPasswordFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isResetPasswordFailed = true;
        this.isResetPasswordSuccess = false;
      }
    )
  }

}
