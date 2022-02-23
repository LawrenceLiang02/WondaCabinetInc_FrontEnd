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
        <label i18n>Reference Name</label>
        <input i18n-placeholder type="text" ngModel class="form-control" id="cabinetType" name = "cabinetType" placeholder="Kitchen">
      </div>
      <div class="form-group">
        <label i18n>Color (please reference to <a href="https://www.benjaminmoore.com/en-ca/colour-overview" target="_blank" >BenjaminMoore</a> catalog)</label>
        <input i18n-placeholder type="text" ngModel class="form-control" name ="color" id="color" placeholder="#000000">
      </div>
      <div class="form-group">
      <label i18n for="select_material">Material</label>
      <select class="form-control" ngModel id="material" name="material">
        <option i18n>Oak</option>
        <option i18n>Maple</option>
        <option i18n>Medium-density fibreboard</option>
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
      <label i18n for="select_handle">Select a handle</label>
      <select class="form-control" ngModel id="handleType" name="handleType">
        <option i18n>Square</option>
        <option i18n>Round</option>
        <option i18n>Knob</option>
      </select>
      </div>
      <div class="form-group">
      <label i18n>Email</label>
      <input i18n-placeholder type="email" ngModel class="form-control" id="email" name = "email" placeholder="Email" [(ngModel)]="email">
      </div>
      <div class="form-group">
      <label i18n>Address</label>
      <input i18n-placeholder type="text" ngModel class="form-control" id="address" name = "address" placeholder="Address">
      </div>
      <div class="form-group">
      <label i18n>City</label>
      <input i18n-placeholder type="text" ngModel class="form-control" id="city" name = "city" placeholder="City">
      </div>
      <div>
        <label i18n for="exampleFormControlTextarea1">Additional Items</label>
        <textarea i18n-placeholder class="form-control" id="additional_items" rows="3" placeholder="E.g. Lazy Suzan, Spice Rack" name="additional_items"></textarea>
      </div>
      <br>
      <div>
      <button i18n [disabled]="addForm.invalid" type="submit" class="btn btn-primary mb-2" name="submit">Submit</button>
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
