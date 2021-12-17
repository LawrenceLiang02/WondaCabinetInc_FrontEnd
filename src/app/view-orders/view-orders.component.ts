import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { order } from './order';
import { OrderServiceService } from './order-service.service';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-view-orders',
  template: `
      <h2>Orders</h2>
      <table class="table table-striped">
        <tr>
          <th scope="col">Tracking Number</th>
          <th scope="col">Order Status</th>
          <th scope="col">Design</th>
        </tr>
        <tr *ngFor="let order of orders">
          <td scope="row">{{order.trackingNo}}</td>
          <td>{{order.orderStatus}}</td>
          <td>{{order.design}}</td>
          <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button>Details</button></td>
        </tr>
      </table>
  `,
  styles: [
  ]
})


export class ViewOrdersComponent implements OnInit {
  public orders: order[] = [];

  constructor(private OrderService:OrderServiceService
    
    ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  public getAllOrders(): void{
    this.OrderService.getAllOrders().subscribe(
      (response: order[]) => {
        this.orders = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
