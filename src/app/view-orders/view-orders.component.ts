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
import { Subscription } from 'rxjs';
import { EventBusService } from '../login/eventbus.service';
import { EventData } from '../login/event.class';


@Component({
  selector: 'app-view-orders',
  template: `
      <mat-tab-group>
        <mat-tab label="Active Orders">
          <div class="my-container">
          <h2>Active Orders</h2>
            <table *ngIf="showEmployeeContent" class="table table-bordered">
              <tr>
                <th scope="col">Tracking Number</th>
                <th scope="col">Order Status</th>
                <!-- <th scope="col">Design</th> -->
              </tr>
              <tr *ngFor="let order of activeOrders">
                <td scope="row">{{order.trackingNo}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <!-- <td name="design">{{order.design}}</td> -->
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button>Details</button></td>
                <td name="update-orders" routerLink="/update-orders/{{order.orderId}}"><button>Update</button></td>
                <td name="delete-orders" ><button (click)="onCreate(order.orderId)">Delete</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>

            <table *ngIf="!showEmployeeContent" class="table table-bordered">
              <tr>
                <th scope="col">Tracking Number</th>
                <th scope="col">Order Status</th>
                <!-- <th scope="col">Design</th> -->
              </tr>
              <tr *ngFor="let order of activeByEmail">
                <td scope="row">{{order.trackingNo}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <!-- <td name="design">{{order.design}}</td> -->
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button>Details</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>
          </div>
        </mat-tab>
        <mat-tab label="Cancelled Orders">
        <div class="my-container">
        <h2>Cancelled Orders</h2>
            <table *ngIf="showEmployeeContent" class="table table-striped table-bordered">
            <tr>
                <th scope="col">Tracking Number</th>
                <th scope="col">Order Status</th>
                <!-- <th scope="col">Design</th> -->
              </tr>
              <tr *ngFor="let order of cancelledOrders">
                <td scope="row">{{order.trackingNo}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <!-- <td name="design">{{order.design}}</td> -->
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button>Details</button></td>
                <td name="update-orders" routerLink="/update-orders/{{order.orderId}}"><button>Update</button></td>
                <td name="delete-orders" ><button (click)="onCreate(order.orderId)">Delete</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>

            <table *ngIf="!showEmployeeContent" class="table table-bordered">
              <tr>
                <th scope="col">Tracking Number</th>
                <th scope="col">Order Status</th>
                <!-- <th scope="col">Design</th> -->
              </tr>
              <tr *ngFor="let order of cancelledByEmail">
                <td scope="row">{{order.trackingNo}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <!-- <td name="design">{{order.design}}</td> -->
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button>Details</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>
        </div>
        </mat-tab>
        <mat-tab label="All Orders">        
        <div class="my-container">  
          <h2>All Orders</h2>
            <table *ngIf="showEmployeeContent" class="table table-striped table-bordered">
            <tr>
                <th scope="col">Tracking Number</th>
                <th scope="col">Order Status</th>
                <!-- <th scope="col">Design</th> -->
              </tr>
              <tr *ngFor="let order of activeOrders">
                <td scope="row">{{order.trackingNo}}</td>
                <td name="orderStatus">{{order.orderStatus}}</td>
                <!-- <td name="design">{{order.design}}</td> -->
                <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button>Details</button></td>
                <td name="update-orders" routerLink="/update-orders/{{order.orderId}}"><button>Update</button></td>
                <td name="delete-orders" ><button (click)="onCreate(order.orderId)">Delete</button></td>
                <!-- <td name="cancel-order" routerLink=""><button>Cancel</button></td> -->
              </tr>
            </table>

            <table *ngIf="!showEmployeeContent" class="table table-bordered">
            <tr>
              <th scope="col">Tracking Number</th>
              <th scope="col">Order Status</th>
              <!-- <th scope="col">Design</th> -->
            </tr>
            <tr *ngFor="let order of allByEmail">
              <td scope="row">{{order.trackingNo}}</td>
              <td name="orderStatus">{{order.orderStatus}}</td>
              <!-- <td name="design">{{order.design}}</td> -->
              <td name="view-order-details" routerLink="/view-orders/{{order.orderId}}"><button>Details</button></td>
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
  eventBusSub?: Subscription
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
    private dialog:MatDialog,
    private eventBusService: EventBusService

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

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    
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
        if(error.status == 403){
          this.eventBusService.emit(new EventData('logout', null))
        }
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
        if(error.status == 403){
          this.eventBusService.emit(new EventData('logout', null))
        }
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
        if(error.status == 403){
          this.eventBusService.emit(new EventData('logout', null))
        }
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
        if(error.status == 403){
          this.eventBusService.emit(new EventData('logout', null))
        }
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
        if(error.status == 403){
          this.eventBusService.emit(new EventData('logout', null))
        }
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
        if(error.status == 403){
          this.eventBusService.emit(new EventData('logout', null))
        }
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

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.roles = [];
    this.showEmployeeContent = false;
    
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

}
