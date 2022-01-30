import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../login/tokenstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </head>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" routerLink="/">
              <img src="assets/images/Wonda Cabinet Inc. Logo.png" alt="" width="30" height="auto" class="wci-logo d-inline-block align-text-top">
              Wonda Cabinet Inc.</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" routerLink="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" *ngIf="isLoggedIn" name="view-orders" routerLink="/view-orders">View orders</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" *ngIf="isLoggedIn" name="add-orders" routerLink="/add-orders">Order Now</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" *ngIf="isLoggedIn" name="logout" (click)="logout()" routerLink="/login">Log Out</a>
                  <a class="nav-link" *ngIf="!isLoggedIn" name="logout" routerLink="/login">Log In</a>
                </li>
                <!-- <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li> -->
              </ul>
            </div>
            <p *ngIf="isLoggedIn">Welcome, {{ username }}</p>
          </div>
        </nav>
        
    </header>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

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

  logout(): void {
    if(this.router.url === '/login'){
      this.tokenStorageService.signOut();
      this.isLoggedIn = false;
      window.location.reload();
    }
    else{
      this.tokenStorageService.signOut();
      this.router.navigate(['/', 'login'])
      this.isLoggedIn = false;
    }
   
  }

}
