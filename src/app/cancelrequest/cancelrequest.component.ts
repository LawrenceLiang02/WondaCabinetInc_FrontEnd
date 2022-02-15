import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../view-orders/order-service.service';

@Component({
  selector: 'app-cancelrequest',
  template: `
  <h1 class="jumbotron" style='text-align: center; font-weight: bold'>Request Specifications About Your Orders</h1>
  <h1 style='text-align: center; font-weight: bold'>Cancellation Request</h1>
  <div class='my-container' style="display: flex; justify-content: center; align-items: center; height: 500px;">
  <form *ngIf="!isSuccess" (ngSubmit)="f.form.valid && onSubmit()" name="form" #f="ngForm" novalidate>
    <div class="form-group">
    <label for="trackingNo" style="font-size: 150%">Tracking No</label>
    <input type="text"
     ngModel class="form-control"
     id="trackingNo"
     name="trackingNo"
     placeholder="123456" 
     style='width: 900px'
     [(ngModel)]="form.trackingNo"
     required
     #trackingNo="ngModel">

     <div
          class="alert alert-danger"
          role="alert"
          *ngIf="trackingNo.errors && f.submitted"
        >
          Tracking Number is required!
        </div>
    </div>
    <div class="form-group">
    <label for="body" style="font-size: 150%">Extra Specifications to Cancellation</label>
    <textarea
    ngModel class="form-control"
     id="body"
     name="body"
     placeholder="Enter cancellation specifications here." 
     style='width: 900px'
     [(ngModel)]="form.body"
     rows="10"
     #body="ngModel">
     </textarea>
     <div>
     <button type="submit" class="btn btn-primary mb-2" name="submit" style='margin-top: 10px; text-align: center; float: right'>Send Request</button>
     </div>

     <div class="form-group">
      <div
      class="alert alert-danger"
      role="alert"
      name="failedSend"
      *ngIf="f.submitted && isFailed"
      >
      Email could not be sent due to: {{ errorMessage }}
      </div>
    </div>
    </div>
  </form>
  <div class="alert alert-success" name="success" *ngIf="isSuccess">
    Email sent to staff.
    <a routerLink="/">Back to Home</a>
  </div>
  `,
  styles: [
  ]
})
export class CancelrequestComponent implements OnInit {
  form: any = {
    trackingNo: null,
    body: null
  }
  errorMessage = '';
  isSuccess = false;
  isFailed = false;

  constructor(private orderService: OrderServiceService) { }

  ngOnInit(): void {
  }

  public onSubmit(){
    const {trackingNo, body} = this.form;
    this.orderService.requestCancellation(trackingNo, body).subscribe(
      data => {
        this.isSuccess = true;
        this.isFailed = false;
      },
      err => {
        this.isFailed = true;
        this.isSuccess = false;
        this.errorMessage = err.error.message;
      }
    )
  }

}
