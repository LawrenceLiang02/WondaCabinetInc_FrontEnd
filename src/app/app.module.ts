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
import { FormsModule } from '@angular/forms';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ViewOrdersComponent,
    OrderdetailsComponent,
    AddOrderComponent,
    UpdateOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [OrderServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
