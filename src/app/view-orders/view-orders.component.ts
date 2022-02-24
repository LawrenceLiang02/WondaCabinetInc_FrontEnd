import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { order } from './order';
import { OrderServiceService } from './order-service.service';
import {NavigationExtras} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { TokenStorageService } from '../login/tokenstorage.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddOrderComponent } from '../add-order/add-order.component';
import { DeleteOrderComponent } from '../delete-order/delete-order.component';
import { DateTimePickerComponent } from '../date-time-picker/date-time-picker.component';


@Component({
  selector: 'app-view-orders',
  template: `
      <mat-tab-group>
        <mat-tab name="active_tab" id="active_tab" label="Active Orders">
          <div class="my-container scrollable-table">
          <h2 i18n>Active Orders</h2>
            <table *ngIf="showEmployeeContent" class="table table-bordered" >
              <tr>
                <th i18n scope="col" >Tracking Number</th>
                <th i18n scope="col">Reference Name</th>
                <th i18n scope="col">Email</th>
                <th i18n scope="col">Order Status</th>
                <!-- <th scope="col">Design</th> -->
              </tr>
              <tr *ngFor="let order of activeOrders">
                <td scope="row" name="trackingNo" id="trackingNo">{{order.trackingNo}}</td>
                <td name="cabinetType">{{order.cabinetType}}</td>
                <td name="email">{{order.email}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <!-- <td name="design">{{order.design}}</td> -->
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button i18n mat-stroked-button name="details" id="details">Details</button></td>
                <td name="update-orders" routerLink="/update-orders/{{order.orderId}}"><button i18n mat-stroked-button name="update" id="update">Update</button></td>
                <td name="delete-orders" ><button i18n (click)="onCreate(order.orderId)" mat-stroked-button  name="delete" id="delete">Delete</button></td>
                <td name="delivery" ><button i18n *ngIf="order.orderStatus=='Awaiting Shipment'" mat-stroked-button (click)="scheduleDelivery(order.orderId, order.deliveryDate)" name="delivery" id="delivery">Delivery</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
              <!-- <mat-paginator [length]="10"
                [pageSize]="10"
                [pageSizeOptions]="[5, 10, 25, 100]"
                aria-label="Select page">
              </mat-paginator> -->
            </table>

            <table *ngIf="!showEmployeeContent" class="table table-bordered">
              <tr>
                <th i18n scope="col">Tracking Number</th>
                <th i18n scope="col">Reference Name</th>
                <th i18n scope="col">Order Status</th>
                <!-- <th scope="col">Design</th> -->
              </tr>
              <tr *ngFor="let order of activeByEmail">
                <td scope="row" name="trackingNo" id="trackingNo">{{order.trackingNo}}</td>
                <td name="cabinetType">{{order.cabinetType}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <!-- <td name="design">{{order.design}}</td> -->
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button i18n mat-stroked-button name="details" id="details" >Details</button></td>
                <td name="delivery"><button i18n *ngIf="order.orderStatus=='Awaiting Shipment'" mat-stroked-button (click)="scheduleDelivery(order.orderId, order.deliveryDate)" name="delivery" id="delivery">Delivery</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>
          </div>
        </mat-tab>
        <mat-tab name="cancelled_tab" id="cancelled_tab" label="Cancelled Orders">
        <div class="my-container scrollable-table">
        <h2 i18n>Cancelled Orders</h2>
            <table *ngIf="showEmployeeContent" class="table table-striped table-bordered">
            <tr>
                <th i18n scope="col">Tracking Number</th>
                <th i18n scope="col">Reference Name</th>
                <th i18n scope="col">Email</th>
                <th i18n scope="col">Order Status</th>
                <!-- <th scope="col">Design</th> -->
              </tr>
              <tr *ngFor="let order of cancelledOrders">
                <td scope="row" name="trackingNo" id="trackingNo">{{order.trackingNo}}</td>
                <td name="cabinetType">{{order.cabinetType}}</td>
                <td name="email">{{order.email}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <!-- <td name="design">{{order.design}}</td> -->
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button i18n mat-stroked-button name="details" id="details">Details</button></td>
                <td name="update-orders" routerLink="/update-orders/{{order.orderId}}"><button i18n mat-stroked-button name="update" id="update">Update</button></td>
                <td name="delete-orders" ><button i18n mat-stroked-button (click)="onCreate(order.orderId)" name="delete" id="delete" >Delete</button></td>
                <td name="delivery" ><button i18n *ngIf="order.orderStatus=='Awaiting Shipment'" mat-stroked-button (click)="scheduleDelivery(order.orderId, order.deliveryDate)" name="delivery" id="delivery">Delivery</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>

            <table *ngIf="!showEmployeeContent" class="table table-bordered">
              <tr>
                <th i18n scope="col">Tracking Number</th>
                <th i18n scope="col">Reference Name</th>
                <th i18n scope="col">Order Status</th>
                <!-- <th scope="col">Design</th> -->
              </tr>
              <tr *ngFor="let order of cancelledByEmail">
                <td scope="row" name="trackingNo" id="trackingNo">{{order.trackingNo}}</td>
                <td name="cabinetType">{{order.cabinetType}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <!-- <td name="design">{{order.design}}</td> -->
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button i18n mat-stroked-button name="details" id="details">Details</button></td>
                <td name="delivery" ><button i18n *ngIf="order.orderStatus=='Awaiting Shipment'" mat-stroked-button (click)="scheduleDelivery(order.orderId, order.deliveryDate)" name="delivery" id="delivery">Delivery</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>
        </div>
        </mat-tab>
        <mat-tab name="all_tab" id="all_tab" label="All Orders">        
        <div class="my-container scrollable-table">  
          <h2 i18n>All Orders</h2>
            <table *ngIf="showEmployeeContent" class="table table-striped table-bordered">
            <tr>
                <th i18n scope="col">Tracking Number</th>
                <th i18n scope="col">Reference Name</th>
                <th i18n scope="col">Email</th>
                <th i18n scope="col">Order Status</th>
                <!-- <th scope="col">Design</th> -->
              </tr>
              <tr *ngFor="let order of orders">
                <td scope="row" name="trackingNo" id="trackingNo">{{order.trackingNo}}</td>
                <td name="cabinetType">{{order.cabinetType}}</td>
                <td name="email">{{order.email}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <!-- <td name="design">{{order.design}}</td> -->
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button i18n mat-stroked-button name="details" id="details">Details</button></td>
                <td name="update-orders" routerLink="/update-orders/{{order.orderId}}"><button i18n mat-stroked-button name="update" id="update">Update</button></td>
                <td name="delete-orders" ><button i18nmat-stroked-button (click)="onCreate(order.orderId)" name="delete" id="delete">Delete</button></td>
                <td name="delivery" ><button i18n *ngIf="order.orderStatus=='Awaiting Shipment'" mat-stroked-button (click)="scheduleDelivery(order.orderId, order.deliveryDate)" name="delivery" id="delivery">Delivery</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>

            <table *ngIf="!showEmployeeContent" class="table table-bordered">
            <tr>
              <th i18n scope="col">Tracking Number</th>
              <th i18nscope="col">Reference Name</th>
              <th i18n scope="col">Order Status</th>
              <!-- <th scope="col">Design</th> -->
            </tr>
            <tr *ngFor="let order of allByEmail">
              <td scope="row" name="trackingNo" id="trackingNo">{{order.trackingNo}}</td>
              <td name="cabinetType">{{order.cabinetType}}</td>
              <td name="orderStatus">{{order.orderStatus}}</td>
              <!-- <td name="design">{{order.design}}</td> -->
              <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button i18n mat-stroked-button>Details</button></td>
              <td name="delivery" ><button i18n *ngIf="order.orderStatus=='Awaiting Shipment'" mat-stroked-button (click)="scheduleDelivery(order.orderId, order.deliveryDate)" name="delivery" id="delivery">Delivery</button></td>
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
  public activeByEmail: order[] = []
  public cancelledByEmail: order[] = []
  public allByEmail: order[] = []
  // public dialogRef:any;

  private roles: string[] = [];
  isLoggedIn = false;
  showEmployeeContent = false;
  username?: string;
  email?: string;
  

  constructor(
    private OrderService:OrderServiceService, 
    private tokenStorageService: TokenStorageService,  
    private route:ActivatedRoute,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    
    // this.CancelOrder();

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showEmployeeContent = this.roles.includes('ROLE_EMPLOYEE');

      this.username = user.username;
      this.email = user.email;
      
    }

    if(this.showEmployeeContent){
     this.getOrders();
     this.getAllActiveOrders();
     this.getAllCancelledOrders();
    }
    this.route.params.subscribe(params =>
      this.email = params['email']
    );
    
    this.getAllByEmail(this.tokenStorageService.getUser().email);
    this.getAllByEmailActive(this.tokenStorageService.getUser().email);
    this.getAllByEmailCancelled(this.tokenStorageService.getUser().email);
   
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

  public getAllByEmail(email): void{
    this.OrderService.getAllOrdersByEmail(email).subscribe(
      (response: order[]) => {
        this.allByEmail = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public getAllByEmailActive(email): void{
    this.OrderService.getAllActiveOrdersByEmail(email).subscribe(
      (response: order[]) => {
        this.activeByEmail = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public getAllByEmailCancelled(email): void{
    this.OrderService.getAllCancelledOrdersByEmail(email).subscribe(
      (response: order[]) => {
        this.cancelledByEmail = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  
  public onCreate(id){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    dialogConfig.data = {
      id: id
    }
    // alert(dialogConfig.data.id)
    // this.dialogRef = this.dialog.open(DeleteOrderComponent, dialogConfig);
    this.dialog.open(DeleteOrderComponent, dialogConfig);
    // this.dialogRef.afterClosed().subscribe(result => {
    //       this.reloadPage();
    // });
    

  }

  public scheduleDelivery(id, date){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '250px';
    dialogConfig.data = {
      id: id,
      deliveryDate: date
    }
    this.dialog.open(DateTimePickerComponent, dialogConfig);

  }

  

}
