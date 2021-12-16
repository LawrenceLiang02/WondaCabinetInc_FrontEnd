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
      <div>
       <strong>Name:</strong> {{order.orderdetails.color}}
      </div>
      
    </div>
    
  `,
  styles: [
  ]
})

export class OrderdetailsComponent implements OnInit {
  order!: order;

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
