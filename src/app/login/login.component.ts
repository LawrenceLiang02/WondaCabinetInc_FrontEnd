import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
  <h1 style='text-align: center; font-weight: bold'>Welcome to Wonda Cabinet Inc</h1>
  <h1 style='text-align: center; font-weight: bold'>Login</h1>
   <div class='my-container' style="display: flex; justify-content: center; align-items: center; height: 500px;">
      <form #loginForm="ngForm" >
        <div class="form-group">
          <label style="font-size: 150%">Username</label>
          <input type="text" ngModel class="form-control" id="username" name="username" placeholder="exampleuser" style='max-width: 900px'>
        </div>

        <div class="form-group">
        <label style="font-size: 150%">Password</label>
        <input type="password" ngModel class="form-control" id="password" name="password" style='max-width: 900px'>
        </div>

        <div>
          <button type="submit" class="btn btn-primary mb-2" name="submit" style='margin-top: 10px; text-align: center; width: 900px;'>Login</button>
        </div>
      </form>
      
   </div>
   <div style="display: block; margin-left: 510px">
     <h1>Don't have an account?</h1>
     <a href="#" style="font-size: 150%">Sign Up For Free</a><br><br>
     <a href="#" style="font-size: 150%">Continue as Guest</a>
   </div>

  
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
