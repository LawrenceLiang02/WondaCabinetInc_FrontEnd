import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { TokenStorageService } from '../login/tokenstorage.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { locales } from '../locales.values';


@Component({
  selector: 'app-header',
  template: `

    <!-- <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light flex-row align-center">
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
                  <a class="nav-link" *ngIf="isLoggedIn" name="view-orders" routerLink="/view-orders">View Orders</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" *ngIf="isLoggedIn" name="add-orders" routerLink="/add-orders">Order Now</a>
                </li>
                <li>
                  <a class="nav-link" name="view-order-with-tracking-no" routerLink="/track">Track Your Order</a>
                </li>
                <li>
                  <a class="nav-link" name="request-update" routerLink="/updaterequest">Request an Update</a>
                </li>
                <li>
                  <a class="nav-link" name="contact" routerLink="/contact">Contact Us</a>
                </li>
                <li class="nav-item ">
                  <a class="nav-link" *ngIf="isLoggedIn" name="logout" (click)="logout()" routerLink="/login">Log Out</a>
                  <a class="nav-link" *ngIf="!isLoggedIn" name="logout" routerLink="/login">Log In</a>
                </li>

              </ul>
            </div>
            <p *ngIf="isLoggedIn">Welcome, {{ username }}</p>
          </div>
        </nav>
        
    </header> -->
    <div>
      <mat-toolbar fxLayout = "row" style="background-color: rgb(223, 83, 83);">
          <a fxFlex class="navbar-brand" routerLink="/home" style="color: black" title="Home">
            <img src="assets/images/Wonda Cabinet Inc. Logo.png" width="50" alt="Home" height="auto" class="wci-logo">
            <span class="header-button">
            Wonda Cabinet Inc.
            </span>
          </a>
            <button i18n fxHide.xs mat-button class="header-button" name="home" routerLink="home" [routerLinkActive]="['active']" [routerLinkActiveOptions]={exact:true}>Home</button>
            <button i18n fxHide.xs mat-button class="header-button" *ngIf="isLoggedIn" name="view-orders" routerLink="/view-orders" [routerLinkActive]="['active']">View Orders</button>
            <button i18n fxHide.xs mat-button class="header-button" *ngIf="isLoggedIn" name="add-orders" routerLink="/add-orders" [routerLinkActive]="['active']">Order Now</button>
            <button i18n fxHide.xs mat-button class="header-button" name="view-order-with-tracking-no" routerLink="/track" [routerLinkActive]="['active']">Track Your Order</button>
            <button i18n fxHide.xs mat-button class="header-button" *ngIf="isLoggedIn && !showEmployeeContent" name="request-update" routerLink="/updaterequest" [routerLinkActive]="['active']">Request an Update</button>
            <button i18nfxHide.xs mat-button class="header-button" *ngIf="isLoggedIn && !showEmployeeContent" name="request-cancel" routerLink="/cancelrequest" [routerLinkActive]="['active']">Request a Cancellation</button>
            <span class="example-spacer"></span>

            <button i18n fxHide.xs mat-button class="header-button" *ngIf="!isLoggedIn" name="logout" routerLink="/login" [routerLinkActive]="['active']">Log In</button>
            
            <button i18n fxHide.xs mat-button class="header-button" *ngIf="isLoggedIn" name="profile">Welcome, {{ username }}</button>
            
            <button i18n fxHide.xs mat-button class="header-button" *ngIf="isLoggedIn" name="logout" (click)="logout()" routerLink="/login">Log Out</button> 
            <button i18n fxHide.xs mat-button class="header-button" name="contact" routerLink="/contact" [routerLinkActive]="['active']">Contact Us</button> 
            <!-- <mat-list-item *ngFor="let locale of locales">
              <button fxHide.xs mat-button class="header-button"><a class="lang-option" [href]="'/' + locale.code + currentUrl">{{ locale.text }}</a></button>
            </mat-list-item> -->
            <button *ngIf="isEnglish" fxHide.xs mat-button class="header-button" ><a  style="text-decoration: none; color: white;" href="/fr/">FR</a></button>
            <button *ngIf="!isEnglish" fxHide.xs mat-button class="header-button" ><a  style="text-decoration: none; color: white;" href="/en-US/">EN</a></button>
            
          <button mat-icon-button [matMenuTriggerFor]="dropMenu" fxHide fxShow.xs>
              <mat-icon>more_vert</mat-icon>
           </button>
           <mat-menu #dropMenu="matMenu">
          <ng-container>
              <button i18n mat-menu-item name="home" routerLink="home" [routerLinkActive]="['active']" [routerLinkActiveOptions]={exact:true}>
                  <mat-icon class="mr">home</mat-icon>Home
              </button>
              <mat-divider></mat-divider>
              <button i18n mat-menu-item *ngIf="isLoggedIn" name="view-orders" routerLink="/view-orders" [routerLinkActive]="['active']">
                  <mat-icon class="mr">assignment</mat-icon>View Orders
              </button>
              <mat-divider></mat-divider>
              <button i18n mat-menu-item *ngIf="isLoggedIn" name="add-orders" routerLink="/add-orders" [routerLinkActive]="['active']">
                  <mat-icon class="mr">add_shopping_cart</mat-icon>Order Now
              </button>
              <mat-divider></mat-divider>
              <button i18n mat-menu-item name="view-order-with-tracking-no" routerLink="/track" [routerLinkActive]="['active']">
                  <mat-icon class="mr"timeline>timeline</mat-icon>Track Your Order
              </button>
              <mat-divider></mat-divider>
              <button mat-menu-item *ngIf="isLoggedIn && !showEmployeeContent" name="request-update" routerLink="/updaterequest" [routerLinkActive]="['active']">
                  <mat-icon class="mr">update</mat-icon>Request an Update
              </button>
              <mat-divider></mat-divider>
              <button i18n mat-menu-item *ngIf="isLoggedIn && !showEmployeeContent" name="request-cancel" routerLink="/cancelrequest" [routerLinkActive]="['active']">
                  <mat-icon class="mr">remove_shopping_cart</mat-icon>Request a Cancellation
              </button>
              <mat-divider></mat-divider>
              <button i18n mat-menu-item *ngIf="!isLoggedIn" name="logout" routerLink="/login" [routerLinkActive]="['active']">
                  <mat-icon class="mr">login</mat-icon>Log In
              </button>
              <mat-divider></mat-divider>
              <button i18n mat-menu-item  *ngIf="isLoggedIn" name="logout" (click)="logout()" routerLink="/login">
                  <mat-icon class="mr">account_box</mat-icon>Log Out
              </button>
              <mat-divider></mat-divider>
              <button i18n mat-menu-item  name="contact" routerLink="/contact" [routerLinkActive]="['active']">
                  <mat-icon class="mr">help</mat-icon>Contact Us
                  
              </button>
              <mat-divider></mat-divider>
          </ng-container>
          </mat-menu>
      </mat-toolbar>
      
    </div>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showEmployeeContent = false;
  username?: string;

  isEnglish: boolean;
  currentUrl = "";
  locales = [];

  languageList = [  
    { code: 'en', label: 'English' },  
    { code: 'fr', label: 'Français' },  
  
  ];

  siteLocale:string;
  siteLanguage:string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, @Inject(LOCALE_ID) public localeId: string) { }

  ngOnInit(): void {
    this.siteLocale = window.location.pathname.split('/')[1];
    
    
    this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale).label;

    if (window.location.pathname.split('/')[1] == "fr"){
      this.isEnglish = false;
    }
    else if (window.location.pathname.split('/')[1] == "en-US"){
      this.isEnglish = true;
    }

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showEmployeeContent = this.roles.includes('ROLE_EMPLOYEE');

      this.username = user.username;
    }

    this.locales = locales;

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
     .subscribe((event:NavigationEnd) => {
       this.currentUrl = this.router.url;
     });
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

  // changeLanguage():void{
  //   if (this.localeId === 'fr'){
  //     this.isEnglish = true;
  //     this.localeId = 'en';
  //   }
  //   else{
  //     this.isEnglish = false;
  //     this.localeId = 'fr';
  //   }
  // }

}
