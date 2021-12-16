import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { order } from '../view-orders/order';
import { OrderServiceService } from '../view-orders/order-service.service';

@Component({
  selector: 'app-orderdetails',
  template: `
    <div *ngIf="order">
      <div>
       <strong>Tracking Number:</strong> {{order.trackingNo}}
      </div>
      <div>
       <strong>Status:</strong> {{order.orderStatus}}
      </div>
      <div >
       <strong>Name:</strong> {{order.orderDetails.cabinetType}}
      </div>
      <div >
       <strong>Color:</strong> {{order.orderDetails.color}}
      </div>
      <div >
       <strong>Material:</strong> {{order.orderDetails.material}}
      </div>
      <div >
       <strong>Handle Type:</strong> {{order.orderDetails.handleType}}
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
