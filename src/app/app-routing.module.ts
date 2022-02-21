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
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdaterequestComponent } from './updaterequest/updaterequest.component';
import { CancelrequestComponent } from './cancelrequest/cancelrequest.component';
import { AuthGuard } from './_auth/auth.guard';

const oktaConfig = {
  issuer: 'https://dev-7962608.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/callback',
  clientId: '0oa3xvu3lmnRUOCAr5d7',
  pkce: true
};

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'view-orders',
    component: ViewOrdersComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_EMPLOYEE' || 'ROLE_CUSTOMER'
    }
  },
  {
    path: 'view-orders/:orderId',
    component: OrderdetailsComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_EMPLOYEE' || 'ROLE_CUSTOMER'
    }
  },
  {
    path: 'add-orders',
    component: AddOrderComponent, 
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_EMPLOYEE' || 'ROLE_CUSTOMER'
    }
  },
  {
    path: 'update-orders/:orderId',
    component: UpdateOrderComponent, 
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_EMPLOYEE'
    }
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
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: 'updaterequest',
    component: UpdaterequestComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_CUSTOMER'
    }
  },
  {
    path: 'cancelrequest',
    component: CancelrequestComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_CUSTOMER'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
