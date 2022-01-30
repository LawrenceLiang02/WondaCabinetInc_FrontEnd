import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../login/login.service';

@Component({
  selector: 'app-signup',
  template: `
  <h1 style='text-align: center; font-weight: bold'>Sign Up Now For Free</h1>
  <div class='my-container' style="display: flex; justify-content: center; align-items: center; height: 500px;">
     <form #loginForm="ngForm" >
       <div class="form-group">
         <label style="font-size: 150%">Username</label>
         <input type="text" ngModel class="form-control" id="username" name="username" placeholder="exampleuser" style='max-width: 900px'>
       </div>

       <div class="form-group">
         <label style="font-size: 150%">Email</label>
         <input type="text" ngModel class="form-control" id="email" name="email" placeholder="exampleuser@example.com" style='max-width: 900px'>
       </div>

       <div class="form-group">
       <label style="font-size: 150%">Password</label>
       <input type="password" ngModel class="form-control" id="password" name="password" style='max-width: 900px'>
       </div>

       <div>
         <button type="submit" class="btn btn-primary mb-2" name="submit" style='margin-top: 10px; text-align: center; width: 900px;'>Sign Up</button>
       </div>

       <div>
         <a routerLink="/login" style="font-size: 150%"style="font-size: 150%">Back to Login</a>
       </div>
     </form>
     
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
