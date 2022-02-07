import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeletePasswordComponent } from '../delete-password/delete-password.component';

@Component({
  selector: 'app-delete-order',
  template: `
    <h2 mat-dialog-title>DELETE</h2>
    <mat-dialog-content class="mat-typography">
      <p>Are you sure you want to delete this order? You can not undo this action. If you wish to keep this in the records, please change the status to "cancelled".</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button class="roundedbutton" mat-button mat-dialog-close>Cancel</button>
      <button class="roundedbutton redbutton" mat-button [mat-dialog-close]="true" cdkFocusInitial (click)="onClick()">Delete</button>
    </mat-dialog-actions>
  `,
  styles: [
  ]
})
export class DeleteOrderComponent implements OnInit {

  constructor(    private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  public onClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DeletePasswordComponent);

  }

}
