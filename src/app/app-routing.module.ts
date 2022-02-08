import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { HomeComponent } from './home/home.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { ViewOrderWithTrackingNoComponent } from './view-order-with-tracking-no/view-order-with-tracking-no.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'view-orders',
    component: ViewOrdersComponent
  },
  {
    path: 'view-orders/:orderId',
    component: OrderdetailsComponent
  },
  {
    path: 'add-orders',
    component: AddOrderComponent
  },
  {
    path: 'add-orders',
    component: AddOrderComponent
  },
  {
    path: 'update-orders/:orderId',
    component: UpdateOrderComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'track',
    component: ViewOrderWithTrackingNoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
