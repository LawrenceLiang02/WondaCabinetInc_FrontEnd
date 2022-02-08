import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { order } from '../view-orders/order';
import { OrderServiceService } from '../view-orders/order-service.service';
import { TokenStorageService } from '../login/tokenstorage.service';
import { Subscription } from 'rxjs';
import { EventBusService } from '../login/eventbus.service';
import { EventData } from '../login/event.class';

@Component({
  selector: 'app-add-order',
  template: `
  <div class="my-container">
    <form #addForm="ngForm" (ngSubmit)="onAddEmployee(addForm)">
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
      <div class="form-group">
      <label>Email</label>
      <input type="email" ngModel class="form-control" id="email" name = "email" placeholder="Email" [(ngModel)]="email">
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

    private roles: string[] = [];
    isLoggedIn = false;
    showEmployeeContent = false;
    username?: string;
    email?: string;
    eventBusSub?: Subscription;

  constructor(private tokenStorageService: TokenStorageService,private OrderService:OrderServiceService,
    private router: Router, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showEmployeeContent = this.roles.includes('ROLE_EMPLOYEE');

      this.username = user.username;
      this.email = user.email;
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  
  public onAddEmployee(addForm:NgForm):void{
    this.OrderService.addOrder(addForm.value).subscribe(
      (response: order) => {
        console.log(response);
        this.router.navigate(['/', 'view-orders']);
        
      },
      (error:HttpErrorResponse) => {
       if(error.status == 403){
         this.eventBusService.emit(new EventData('logout', null))
       }
      }
    );
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.roles = [];
    this.showEmployeeContent = false;
    
  }

}
