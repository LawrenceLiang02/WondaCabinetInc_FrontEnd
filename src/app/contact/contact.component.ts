import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../login/tokenstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  template: `
    <h1 class="jumbotron" style="font-size: 200%; font-weight: bold; text-align: center">Contact Us</h1>
    <div class="row">
      <div class="col">
        <p style="font-size: 150%">If you have any questions, <br>
        please do not hesitate to contact us either by email or by phone. <br>
        Our workers are always available to reach you<br>
        for any concern you have about your orders.</p><br><br>
        <p style="font-size: 150%">Our Services are open from Monday to friday from 8:00AM to 5:30PM Eastern time.</p><br><br>
        <label for="email" style="font-size: 150%">Email:</label>
        <a href="mailto:noreply.wondacabinetinc@gmail.com" style="font-size: 150%">noreply.wondacabinetinc@gmail.com</a>
        <br/><br/>
        <label for="email" style="font-size: 150%">Phone:</label>
        <a href="tel:416-335-9788" style="font-size: 150%">(416) 335-9788</a><br><br>

        <h2 style="font-size: 150%">You can also visit our offices</h2>
        <address style="font-size: 150%">
         34, Golden Gate Crt,<br>
         Scarborough, ON<br>
         M1P 4M8
        </address>
      </div>
      <div class="col">
        <img 
        src="https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=4u1aVMyG8qKP6z1I_l5N5A&cb_client=unknown_client.imagery_viewer.gps&w=203&h=100&yaw=337.6924&pitch=0&thumbfov=100"
        width="950" height="700">
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ContactComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showEmployeeContent = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showEmployeeContent = this.roles.includes('ROLE_EMPLOYEE');

      this.username = user.username;
    }
  }

}
