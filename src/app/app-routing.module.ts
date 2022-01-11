import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { HomeComponent } from './home/home.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { UpdateOrderComponent } from './update-order/update-order.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
