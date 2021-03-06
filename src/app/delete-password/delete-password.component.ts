import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EventData } from '../login/event.class';
import { EventBusService } from '../login/eventbus.service';
import { UserAuthService } from '../login/login.service';
import { TokenStorageService } from '../login/tokenstorage.service';
import { OrderServiceService } from '../view-orders/order-service.service';

@Component({
  selector: 'app-delete-password',
  template: `
    <h2 i18n mat-dialog-title>DELETE</h2>
    <form #f="ngForm" (ngSubmit)="f.form.valid && onSubmit()">
      <mat-dialog-content>
        <p i18n>Please enter your password in order to continue.</p>
        <!-- <label for="password" style="font-size: 150%">Password</label> -->
        
          <input 
          i18n-placeholder
            type="password" 
            ngModel class="form-control" 
            id="password" 
            name="password" 
            style='max-width: 900px'
            [(ngModel)]="form.password"
            required
            #password="ngModel"/>
        <div
            class="alert alert-danger"
            role="alert"
            *ngIf="password.errors && f.submitted">
            <p i18n>Error, please try again.</p>
          </div> 
          <div i18n
          class="alert alert-danger"
          role="alert"
          name="failedLogin"
          *ngIf="f.submitted && isLoginFailed"
        >
          Login failed: {{ errorMessage }}
        </div>
      </mat-dialog-content>
        <mat-dialog-actions align="end">
          <button i18n mat-raised-button mat-dialog-close name="cancel-prompt-2" id="cancel-prompt-2">Cancel</button>
          <!-- mat-button [mat-dialog-close]="true" -->
          <button i18n type="submit" mat-raised-button color="warn" cdkFocusInitial name="delete-prompt-2" id="delete-prompt-2" >Delete</button>
        </mat-dialog-actions>
          
      
    </form>
  `,
  styles: [
  ]
})
export class DeletePasswordComponent implements OnInit {

  public id:number;
  constructor( private dialog:MatDialog, 
    private authService: UserAuthService,
    public dialogRef: MatDialogRef<DeletePasswordComponent>,
    private tokenStorageService: TokenStorageService,
    private OrderService:OrderServiceService,
    private eventBusService: EventBusService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id
     }
  password: string;

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  eventBusSub?: Subscription;

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  public onSubmit(){

    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    // this.dialog.open(DeletePasswordComponent);
    const { password } = this.form;
    const username = this.tokenStorageService.getUser().username;
    
    this.authService.loginNoToken(username, password).subscribe(
      data => {
        
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.reloadPage();
        this.OrderService.deleteOrder(this.id).subscribe(
          (response: string) => {
            console.log(response);
          },
          // (error:HttpErrorResponse) => {
          //   alert(error.message);
          // }
          );
        this.dialogRef.close();
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        if(err.status == 403){
          this.eventBusService.emit(new EventData('logout', null));
        }
      }
    );

  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.roles = [];
    
  }
}
