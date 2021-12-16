import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
