import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../view-orders/order-service.service';
import { order } from '../view-orders/order';
import { TokenStorageService } from '../login/tokenstorage.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-updaterequest',
  template: `
  
  <h1 class="jumbotron" style='text-align: center; font-weight: bold'>Request Specifications About Your Orders</h1>
  <h1 style='text-align: center; font-weight: bold'>Update Request</h1>
  <div class='my-container' style="display: flex; justify-content: center; align-items: center; height: 500px;">
  <form *ngIf="!isSuccess" (ngSubmit)="f.form.valid && onSubmit()" name="form" #f="ngForm" novalidate>
    <div class="form-group">
    <label for="trackingNo" style="font-size: 150%">Tracking No</label>
    <select
     ngModel class="form-control"
     id="trackingNo"
     name="trackingNo"
     placeholder="123456" 
     style='width: 900px'
     [(ngModel)]="form.trackingNo"
     required
     #trackingNo="ngModel">
     <option></option>
      <option *ngFor="let order of activeByEmail">{{ order.trackingNo }}</option>
     </select>

     <div
          class="alert alert-danger"
          role="alert"
          *ngIf="trackingNo.errors && f.submitted"
        >
          Tracking Number is required!
        </div>
    </div>
    <div class="form-group">
    <label for="body" style="font-size: 150%">Specify Modifications to your order</label>
    <textarea
    ngModel class="form-control"
     id="body"
     name="body"
     placeholder="Enter update specifications here." 
     style='width: 900px'
     [(ngModel)]="form.body"
     required
     rows="10"
     #body="ngModel">
     </textarea>
     <div
     class="alert alert-danger"
     role="alert"
     *ngIf="body.errors && f.submitted"
     >
     Body is required!
    </div>
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
    <a routerLink="/view-orders">Back to orders</a>
  </div>
 
  `,
  styles: [
  ]
})
export class UpdaterequestComponent implements OnInit {
  form: any = {
    trackingNo: null,
    body: null
  }
  public activeByEmail: order[] = [];
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  email?: string;
  errorMessage = '';
  isSuccess = false;
  isFailed = false;
  
  constructor(private orderService: OrderServiceService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.username = user.username;
      this.email = user.email;
    }
    this.getAllByEmailActive(this.tokenStorageService.getUser().email);
  }

  public onSubmit(){
    const {trackingNo, body} = this.form;
    this.orderService.requestUpdate(trackingNo, body).subscribe(
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

  public getAllByEmailActive(email): void{
    this.orderService.getAllActiveOrdersByEmail(email).subscribe(
      (response: order[]) => {
        this.activeByEmail = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

}
