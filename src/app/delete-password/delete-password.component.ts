import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserAuthService } from '../login/login.service';

@Component({
  selector: 'app-delete-password',
  template: `
    <h2 mat-dialog-title>DELETE</h2>
    <form #f="ngForm" (ngSubmit)="f.form.valid && onSubmit()">
      <mat-dialog-content class="mat-typography">
        <p>Please enter your password in order to continue.</p>
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
            <p> Error, please try again </p>
          </div> 
        <mat-dialog-actions align="end">
          <button class="roundedbutton" mat-button mat-dialog-close>Cancel</button>
          <button class="roundedbutton redbutton" mat-button [mat-dialog-close]="true" cdkFocusInitial >Delete</button>
        </mat-dialog-actions>
          
      </mat-dialog-content>
    </form>
  `,
  styles: [
  ]
})
export class DeletePasswordComponent implements OnInit {

  constructor( private dialog:MatDialog, private authService: UserAuthService) { }
  password: string;

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  ngOnInit(): void {
  }

  public onSubmit(){

    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    // this.dialog.open(DeletePasswordComponent);
    const { username, password } = this.form;

    this.authService.loginNoToken(username, password).subscribe(
      data => {

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

  }
}
