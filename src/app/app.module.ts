import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { authInterceptorProviders } from './_auth/auth.interceptor';
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
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import { DeletePasswordComponent } from './delete-password/delete-password.component';
import { ViewOrderWithTrackingNoComponent } from './view-order-with-tracking-no/view-order-with-tracking-no.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ViewOrdersComponent,
    OrderdetailsComponent,
    AddOrderComponent,
    UpdateOrderComponent,
    LoginComponent,
    SignupComponent,
    ContactComponent,
    DeleteOrderComponent,
    DeletePasswordComponent,
    ViewOrderWithTrackingNoComponent,
    ForgotpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    NgxExtendedPdfViewerModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatRippleModule,
    MatPaginatorModule
    
  ],
  providers: [OrderServiceService, authInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents:[DeleteOrderComponent, DeletePasswordComponent]
})
export class AppModule { }
