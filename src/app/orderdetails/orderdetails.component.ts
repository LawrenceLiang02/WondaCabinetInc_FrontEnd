import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { order } from '../view-orders/order';
import { OrderServiceService } from '../view-orders/order-service.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-orderdetails',
  template: `
  <div class="my-container">
    <h2 i18n>Order Details</h2>
    <div *ngIf="order">
      <div>
       <strong i18n>Tracking Number:</strong> {{order.trackingNo}}
      </div>
      <div>
       <strong i18n>Status:</strong> {{order.orderStatus}}
      </div>
      <div >
       <strong i18n>Name:</strong> {{order.cabinetType}}
      </div>
      <div >
       <strong i18n>Color:</strong> {{order.color}}
      </div>
      <div >
       <strong i18n>Material:</strong> {{order.material}}
      </div>
      <div >
       <strong i18n>Handle Type:</strong> {{order.handleType}}
      </div>
      <div >
       <strong i18n>Email:</strong> {{order.email}}
      </div>
      <div >
       <strong i18n>Address:</strong> {{order.address}}
      </div>
      <div >
       <strong i18n>City:</strong> {{order.city}}
      </div>
      <div *ngIf="order.deliveryDate != null">
       <strong i18n>Delivery Date:</strong> {{order.deliveryDate}}
      </div>
      <div class="my-container">
        <!-- <embed type="application/pdf" scr="https://s2.q4cdn.com/498544986/files/doc_downloads/test.pdf" width="100%" height="600px"/> -->
        <!-- https://www.keepandshare.com/doc19/38089/210-arctic-court-oshawa-color-pdf-432k?da=y -->
        <ngx-extended-pdf-viewer 
        [src]="order.design" 
        [useBrowserLocale]="true"
        [showOpenFileButton]="false"></ngx-extended-pdf-viewer>
      </div>
      
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
    private route:ActivatedRoute    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const orderId = params['orderId'];
    
    
    this.OrderService.getOrder(orderId)
    .subscribe((response:order) => this.order = response);
    });

  }

}
