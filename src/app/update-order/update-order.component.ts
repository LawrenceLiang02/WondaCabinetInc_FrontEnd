import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderdetailsComponent } from '../orderdetails/orderdetails.component';
import { order } from '../view-orders/order';
import { OrderServiceService } from '../view-orders/order-service.service';

@Component({
  selector: 'app-update-order',
  template: `
  <div class ="my-container">
    <form #updateForm="ngForm" (ngSubmit)="onUpdateOrder(updateForm)">
    <!-- <div class="form-group">
        <label>ID</label>
        <input type="number" ngModel class="form-control" id="orderId" name = "orderId" placeholder="Id" [(ngModel)]="order.orderId">
      </div>  -->
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
        <label>Link to Design (PDF)</label>
        <input type="text" ngModel class="form-control" id="design" name = "design" placeholder="Design" [(ngModel)]="order.design">
      </div> 
    <div class="form-group">
        <label>Reference Name</label>
        <input type="text" ngModel class="form-control" id="cabinetType" name = "cabinetType" placeholder="Kitchen" [(ngModel)]="order.cabinetType">
      </div>
      <div class="form-group">
        <label>Color (please reference to <a href="https://www.benjaminmoore.com/en-ca/colour-overview">BenjaminMoore</a> catalog)</label>
        <input type="text" ngModel class="form-control" name ="color" id="color" placeholder="#000000" [(ngModel)]="order.color">
      </div>
      <div class="form-group">
      <label for="select_handle">Material</label>
      <select class="form-control" ngModel id="material" name="material" [(ngModel)]="order.material">
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
      <select class="form-control" ngModel id="handleType" name="handleType" [(ngModel)]="order.handleType">
        <option>Square</option>
        <option>Round</option>
        <option>Knob</option>
      </select>
      </div>
      <div class="form-group">
      <label>Address</label>
      <input type="text" ngModel class="form-control" id="address" name = "address" placeholder="Address" [(ngModel)]="order.address">
      </div>
      <div class="form-group">
      <label>City</label>
      <input type="text" ngModel class="form-control" id="city" name = "city" placeholder="City" [(ngModel)]="order.city">
      </div>
      <div>
        <label for="exampleFormControlTextarea1">Additional Items</label>
        <textarea class="form-control" id="additional_items" rows="3" placeholder="E.g. Lazy Suzan, Spice Rack" name="additional_items"></textarea>
      </div>
      <br>
      <div>
      <button [disabled]="updateForm.invalid" type="submit" class="btn btn-primary mb-2" name="submit">Submit</button>
      </div>
    </form>
  </div>
`,
  styles: [
  ]
})
export class UpdateOrderComponent implements OnInit {
  order:any;

  constructor(private OrderService:OrderServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orderId = params['orderId'];

      this.OrderService.getOrder(orderId).subscribe(
        data => {
          console.log(data)
          this.order = data
        }, error => console.log(error)
        
        
      );
      
    }
    )
  }

  public onUpdateOrder(updateForm:NgForm):void{
    this.route.params.subscribe(params => {
      const orderId = params['orderId'];
      this.OrderService.updateOrder(orderId,updateForm.value).subscribe(
        (response: order) => {
          console.log(response);
          this.router.navigate(['/', 'view-orders'])
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    });
  }

}
