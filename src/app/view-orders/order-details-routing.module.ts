import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewOrdersComponent } from './view-orders.component';
import { OrderdetailsComponent } from '../orderdetails/orderdetails.component';


const routes: Routes = [
  {
    path: '',
    component: ViewOrdersComponent
  },
  // {
  //   path: ':order_id',
  //   component: OrderdetailsComponent
  // }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OrderDetailsRoutingModule { }
