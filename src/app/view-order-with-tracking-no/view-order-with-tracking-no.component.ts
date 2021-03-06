import { Component, OnInit } from '@angular/core';
import { orderByTrackingNo } from '../view-orders/order';
import { OrderServiceService } from '../view-orders/order-service.service';

@Component({
  selector: 'app-view-order-with-tracking-no',
  template: `
  <div class="my-container bodyContentStyling" style="background-color: WhiteSmoke; width: 100%; padding: 2% 7%">
    <h2 i18n>Track your order!</h2>
    <p i18n>Track your order by entering your order tracking number!</p>
    <div style="width: 30%;"> 
    <mat-form-field class="example-form-field" appearance="fill">

    <mat-label i18n>Tracking Number</mat-label>
      <input matInput type="text" [(ngModel)]="value" name="trackingNo-input" id="trackingNo-input">
      <button *ngIf="value" matSuffix mat-icon-button aria-label="Clear" (click)="value=''" name="clear" id="clear">
        <mat-icon>close</mat-icon>
      </button>
      
    </mat-form-field>
    
    </div>
    <button i18n mat-raised-button (click)="onClick()" name="submit-track" id="submit-track" >Track</button>

</div>
    <div class="my-container" name="orderFound" *ngIf="order && orderFound"> 
      <h2 i18n>Here is the found order</h2>
      <p i18n>Tracking Number: {{order.trackingNo}}</p>
      <p i18n>Status: {{order.orderStatus}}</p>
    </div>
    <div class="my-container" name="errorFound" *ngIf="hasError"> 
      <h2 i18n>Uh oh, can't seem to find your order.</h2>
      <p i18n>This is what we got: {{ errorMessage }}</p>
      <p i18n>Please check your tracking number and try again.</p>
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
