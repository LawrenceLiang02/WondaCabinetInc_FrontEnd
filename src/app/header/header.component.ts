import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
        <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <script type="text/javascript" src="app/src/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
      <script type="text/javascript" src="app/src/node_modules/bootstrap/dist/js/bootstrap.bundle.js"></script>
      <script src="app/src/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map"></script>
      <script src="app/src/node_modules/bootstrap/dist/js/bootstrap.bundle.js.map"></script>
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
                  <a class="nav-link" name="view-orders" routerLink="/view-orders">View orders</a>
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
          </div>
        </nav>
    </header>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
