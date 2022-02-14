import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { order } from '../view-orders/order';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-date-time-picker',
  template: `
    <h2 mat-dialog-title>DELIVERY</h2>
    <form #f="ngForm" (ngSubmit)="f.form.valid && onClick()">
      <p>Choose a date</p>
      <div style="display: flex;">
      <input matInput [matDatepicker]="picker" id="date" name="date" [(ngModel)]="form.date" class="form-control" >
      <mat-datepicker-toggle [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      </div>
      <!-- <input type="time" id="time" name="time" class="form-control" [(ngModel)]="form.time" min="09:00" max="18:00" required  > -->
    <mat-dialog-actions align="end">
      <button mat-raised-button mat-dialog-close>Cancel</button>
      <button type="submit" mat-raised-button mat-button [mat-dialog-close]="true" cdkFocusInitial>Select</button>
    </mat-dialog-actions>
    </form>
  `,
  styles: [
  ]
})
export class DateTimePickerComponent implements OnInit {

  @Input() matDatepicker: boolean;

  public id:number;

  date:string;
  time:string;
  
  OrderService: any;
  constructor(    private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) data) {

    this.id = data.id
   }

   form: any = {
    date: null,
    time: null
  };

  ngOnInit(): void {
  }

  public onClick(){
    const { date } = this.form;
    alert(date.formatDate('medium'))
    const deliveryDate = date;
    this.OrderService.updateOrder(this.id, deliveryDate ).subscribe(
      (response: order) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

}
