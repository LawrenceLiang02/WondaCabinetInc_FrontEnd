import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { order } from '../view-orders/order';
import { DatePipe } from '@angular/common'
import { OrderServiceService } from '../view-orders/order-service.service';

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
      <input type="time" id="time" name="time" class="form-control" [(ngModel)]="form.time" min="09:00" max="18:00" required  >
    <mat-dialog-actions align="end">
      <button mat-raised-button mat-dialog-close>Cancel</button>
      <button type="submit" mat-raised-button mat-button [mat-dialog-close]="true" cdkFocusInitial [disabled]="!f.form.valid">Select</button>
    </mat-dialog-actions>
    </form>
  `,
  styles: [
  ]
})
export class DateTimePickerComponent implements OnInit {

  @Input() matDatepicker: boolean;

  public id:number;

  deliveryDate:string;
  date:string;
  time:string;

   form: any = {
    date: null,
    time: null
  };  

  constructor(
    public datepipe: DatePipe,
    private dialog:MatDialog, 
    private OrderService:OrderServiceService,
    @Inject(MAT_DIALOG_DATA) data,
    
    ) {

    this.id = data.id
    this.date = this.datepipe.transform(data.deliveryDate, 'yyyy-MM-dd');
   }



  ngOnInit(): void {
  }

  public onClick(){
    const { date, time } = this.form;
    let deliveryDate =this.datepipe.transform(date, 'yyyy-MM-dd');
    deliveryDate += " " + time + ":00";
    // alert(deliveryDate)
    this.OrderService.updateOrderDelivery(this.id, deliveryDate ).subscribe(
      (response: order) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

}
