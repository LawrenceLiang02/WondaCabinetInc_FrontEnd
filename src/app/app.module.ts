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
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';

import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DatePipe } from '@angular/common';


import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdaterequestComponent } from './updaterequest/updaterequest.component';
import { CancelrequestComponent } from './cancelrequest/cancelrequest.component';



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

    DateTimePickerComponent
    ForgotpasswordComponent,
<<<<<<< HEAD

=======
    UpdaterequestComponent,
    CancelrequestComponent,
>>>>>>> aea36e3 (Added components and service methods)
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
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
    
    
  ],
  providers: [OrderServiceService, authInterceptorProviders, DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[DeleteOrderComponent, DeletePasswordComponent, DateTimePickerComponent]
})
export class AppModule { }
