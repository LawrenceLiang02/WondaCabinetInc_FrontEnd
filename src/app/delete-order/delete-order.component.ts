import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeletePasswordComponent } from '../delete-password/delete-password.component';

@Component({
  selector: 'app-delete-order',
  template: `
    <h2 mat-dialog-title>DELETE</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete this order? You can not undo this action. If you wish to keep this in the records, please change the status to "cancelled".</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="warn" mat-button [mat-dialog-close]="true" cdkFocusInitial (click)="onClick()">Delete</button>
    </mat-dialog-actions>
  `,
  styles: [
  ]
})
export class DeleteOrderComponent implements OnInit {

  public id:number;
  constructor(    private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) data) {

    this.id = data.id
   }


  ngOnInit(): void {
  }

  public onClick(){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    dialogConfig.data = {
      id: this.id
      
    }
    // alert(dialogConfig.data.id);
    this.dialog.open(DeletePasswordComponent, dialogConfig);
    
    
  }

}
