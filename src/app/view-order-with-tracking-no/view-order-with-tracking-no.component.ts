import { Component, OnInit } from '@angular/core';
import { orderByTrackingNo } from '../view-orders/order';
import { OrderServiceService } from '../view-orders/order-service.service';

@Component({
  selector: 'app-view-order-with-tracking-no',
  template: `
  <div class="my-container bodyContentStyling" style="background-color: WhiteSmoke; width: 100%; padding: 2% 7%">
    <h2>Track your order!</h2>
    <p>Track your order by entering your order tracking number!</p>
    <div style="width: 30%;"> 
    <mat-form-field class="example-form-field" appearance="fill">

    <mat-label>Tracking Number</mat-label>
      <input matInput type="text" [(ngModel)]="value" >
      <button *ngIf="value" matSuffix mat-icon-button aria-label="Clear" (click)="value=''">
        <mat-icon>close</mat-icon>
      </button>
      
    </mat-form-field>
    
    </div>
    <button mat-raised-button (click)="onClick()" >Track</button>

</div>
    <div class="my-container" name="orderFound" *ngIf="order && orderFound"> 
      <h2>Here is the found order</h2>
      <p>Tracking Number: {{order.trackingNo}}</p>
      <p>Status: {{order.orderStatus}}</p>
    </div>
    <div class="my-container" name="errorFound" *ngIf="hasError"> 
      <h2>Uh oh, can't seem to find your order.</h2>
      <p>This is what we got: {{ errorMessage }}</p>
      <p>Please check your tracking number and try again.</p>
    </div>
  `,
  styles: [
  ]
})
export class ViewOrderWithTrackingNoComponent implements OnInit {
  order:any;
  value = '';
  orderFound = false;
  hasError = false;
  errorMessage = '';

  constructor(private OrderService:OrderServiceService,) { }

  ngOnInit(): void {
  }

  public onClick(){
    var numberTracking: String = this.value;
    this.OrderService.getOrderByTrackingNo(numberTracking)
    .subscribe(
      (response:orderByTrackingNo) => {
        this.orderFound = true;
        this.hasError = false;
        this.order = response },
      (error) => {
        console.error('error caught in component')
        this.orderFound = false;
        this.hasError =  true;
        this.errorMessage = error.error.message;
      }
      );
    
    }

}
