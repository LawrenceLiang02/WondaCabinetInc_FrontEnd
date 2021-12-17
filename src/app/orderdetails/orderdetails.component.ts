import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { order } from '../view-orders/order';
import { OrderServiceService } from '../view-orders/order-service.service';

@Component({
  selector: 'app-orderdetails',
  template: `
    <h2>Order Details</h2>
    <div *ngIf="order">
      <div>
       <strong>Tracking Number:</strong> {{order.trackingNo}}
      </div>
      <div>
       <strong>Status:</strong> {{order.orderStatus}}
      </div>
      <div >
       <strong>Name:</strong> {{order.cabinetType}}
      </div>
      <div >
       <strong>Color:</strong> {{order.color}}
      </div>
      <div >
       <strong>Material:</strong> {{order.material}}
      </div>
      <div >
       <strong>Handle Type:</strong> {{order.handleType}}
      </div>
      <div>
        <embed type="application/pdf" scr="assets/pdf/210 Arctic Court, Oshawa - Island.pdf"/>
      </div>
      
    </div>
    
  `,
  styles: [
  ]
})

export class OrderdetailsComponent implements OnInit {
  order:any;

  constructor(
    private OrderService:OrderServiceService,
    private route:ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const orderId = params['orderId'];
    
    
    this.OrderService.getOrder(orderId)
    .subscribe((response:order) => this.order = response);
    });

  }

}
