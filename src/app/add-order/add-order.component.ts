import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { order } from '../view-orders/order';
import { OrderServiceService } from '../view-orders/order-service.service';

@Component({
  selector: 'app-add-order',
  template: `
  <div class="my-container">
    <form #addForm="ngForm" (ngSubmit)="onAddEmployee(addForm)">
    <div class="form-group">
        <label>ID</label>
        <input type="number" ngModel class="form-control" id="orderId" name = "orderId" placeholder="Id">
      </div> 
      
      <div class="form-group">
        <label>Tracking Number</label>
        <input type="number" ngModel class="form-control" id="trackingNo" name = "trackingNo" placeholder="Tracking Number">
      </div> 
      <div class="form-group">
      <label for="select_handle">Order Satus</label>
      <select class="form-control" ngModel id="orderStatus" name="orderStatus">
        <option>Awaiting Order</option>
        <option>Order Received</option>
        <option>Design Ready</option>
        <option>Design Confirmed</option>
        <option>Awaiting Deposit</option>
        <option>In Progress</option>
        <option>Awaiting Shipment</option>
        <option>Shipped</option>
        <option>Awaiting Payment</option>
        <option>Done</option>
        <option>Cancelled</option>
      </select>
      </div>
      <div class="form-group">
        <label>Design</label>
        <input type="text" ngModel class="form-control" id="design" name = "design" placeholder="Design">
      </div> 
    <div class="form-group">
        <label>Reference Name</label>
        <input type="text" ngModel class="form-control" id="cabinetType" name = "cabinetType" placeholder="Kitchen">
      </div>
      <div class="form-group">
        <label>Color (please reference to <a href="https://www.benjaminmoore.com/en-ca/colour-overview" target="_blank" >BenjaminMoore</a> catalog)</label>
        <input type="text" ngModel class="form-control" name ="color" id="color" placeholder="#000000">
      </div>
      <div class="form-group">
      <label for="select_handle">Material</label>
      <select class="form-control" ngModel id="material" name="material">
        <option>Oak</option>
        <option>Maple</option>
        <option>Medium-density fibreboard</option>
      </select>
      </div>
      <!-- <div class="form-group">
      <label for="select_handle">Paint Type</label>
      <select class="form-control" id="paint_type">
        <option>Spray</option>
        <option>Wrapped</option>
      </select>
      </div> -->
      <div class="form-group">
      <label for="select_handle">Select a handle</label>
      <select class="form-control" ngModel id="handleType" name="handleType">
        <option>Square</option>
        <option>Round</option>
        <option>Knob</option>
      </select>
      </div>
      <div>
        <label for="exampleFormControlTextarea1">Additional Items</label>
        <textarea class="form-control" id="additional_items" rows="3" placeholder="E.g. Lazy Suzan, Spice Rack" name="additional_items"></textarea>
      </div>
      <br>
      <div>
      <button [disabled]="addForm.invalid" type="submit" class="btn btn-primary mb-2" name="submit">Submit</button>
      </div>
    </form>
  </div>
  `,
  styles: [
    
  ]
})
export class AddOrderComponent implements OnInit {

  constructor(private OrderService:OrderServiceService,
    private router: Router) { }

  ngOnInit(): void {
    // this.addOrder(addForm:NgForm);
  }

  public onAddEmployee(addForm:NgForm):void{
    this.OrderService.addOrder(addForm.value).subscribe(
      (response: order) => {
        console.log(response);
        this.router.navigate(['/', 'view-orders']);
        
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
