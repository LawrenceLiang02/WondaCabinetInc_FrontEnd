import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <div class="my-container">
    <h1>
      Welcome to Home
    </h1>

    <p>
      Welcome to the home page of Wonda Cabinet Inc.
    </p>
  </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
