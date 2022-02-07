import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserAuthService } from '../login/login.service';

@Component({
  selector: 'app-delete-password',
  template: `
    <h2 mat-dialog-title>DELETE</h2>
    <mat-dialog-content class="mat-typography">
      <p>Please enter your password in order to continue.</p>
      <label for="password" style="font-size: 150%">Password</label>
      <form #f="ngForm">
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
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button class="roundedbutton" mat-button mat-dialog-close>Cancel</button>
      <button class="roundedbutton redbutton" mat-button [mat-dialog-close]="true" cdkFocusInitial (click)="onClick()">Delete</button>
    </mat-dialog-actions>
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

  public onClick(){

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
