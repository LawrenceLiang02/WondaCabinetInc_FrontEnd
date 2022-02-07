import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-password',
  template: `
    <h2 mat-dialog-title>DELETE</h2>
    <mat-dialog-content class="mat-typography">
      <p>Please enter your password in order to continue.</p>
      <input matInput [(ngModel)]="password" type="password">
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

  constructor( private dialog:MatDialog) { }
  password: string;
  ngOnInit(): void {
  }

  public onClick(){
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    // this.dialog.open(DeletePasswordComponent);

  }
}
