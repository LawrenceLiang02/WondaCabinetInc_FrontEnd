import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { OrderServiceService } from './view-orders/order-service.service';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AddOrderComponent } from './add-order/add-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ViewOrdersComponent,
    OrderdetailsComponent,
    AddOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [OrderServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
