import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { order } from './order';
import { OrderServiceService } from './order-service.service';
import {NavigationExtras} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-view-orders',
  template: `
      <mat-tab-group>
        <mat-tab label="Active Orders">
          <div class="my-container">
          <h2>Active Orders</h2>
            <table class="table table-bordered">
              <tr>
                <th scope="col">Tracking Number</th>
                <th scope="col">Order Status</th>
                <th scope="col">Design</th>
              </tr>
              <tr *ngFor="let order of activeOrders">
                <td scope="row">{{order.trackingNo}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <td name="design">{{order.design}}</td>
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button>Details</button></td>
                <td name="update-orders" routerLink="/update-orders/{{order.orderId}}"><button>Update</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>
          </div>
        </mat-tab>
        <mat-tab label="Cancelled Orders">
        <div class="my-container">
        <h2>Cancelled Orders</h2>
            <table class="table table-striped table-bordered">
              <tr>
                <th scope="col">Tracking Number</th>
                <th scope="col">Order Status</th>
                <th scope="col">Design</th>
              </tr>
              <tr *ngFor="let order of cancelledOrders">
                <td scope="row">{{order.trackingNo}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <td name="design">{{order.design}}</td>
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button>Details</button></td>
                <td name="update-orders" routerLink="/update-orders/{{order.orderId}}"><button>Update</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>
        </div>
        </mat-tab>
        <mat-tab label="All Orders">        
        <div class="my-container">  
          <h2>All Orders</h2>
            <table class="table table-striped table-bordered">
              <tr>
                <th scope="col">Tracking Number</th>
                <th scope="col">Order Status</th>
                <th scope="col">Design</th>
              </tr>
              <tr *ngFor="let order of orders">
                <td scope="row">{{order.trackingNo}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <td name="design">{{order.design}}</td>
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button>Details</button></td>
                <td name="update-orders" routerLink="/update-orders/{{order.orderId}}"><button>Update</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>
        </div>
          </mat-tab>
      </mat-tab-group>
  `,
  styles: [
  ]
})


export class ViewOrdersComponent implements OnInit {
  public orders: order[] = [];
  public cancelledOrders: order[] = [];
  public activeOrders: order[] = [];

  constructor(private OrderService:OrderServiceService
    
    ) { }

  ngOnInit(): void {
    this.getOrders();
    this.getAllActiveOrders();
    this.getAllCancelledOrders();
    // this.CancelOrder();
  }

  public getOrders(): void{
    this.OrderService.getAllOrders().subscribe(
      (response: order[]) => {
        this.orders = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public getAllActiveOrders(): void{
    this.OrderService.getAllActiveOrders().subscribe(
      (response: order[]) => {
        this.activeOrders = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllCancelledOrders(): void{
    this.OrderService.getAllCancelledOrders().subscribe(
      (response: order[]) => {
        this.cancelledOrders = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
