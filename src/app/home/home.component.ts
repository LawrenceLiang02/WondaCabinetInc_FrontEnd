import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <div class="my-container">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://www.kitchencraft.com/-/media/kitchencraft/pages/homepage/carousel_and_tabs/gentryhero.jpg?h=774&w=1286" class="d-block w-100" alt="https://www.kitchencraft.com/-/media/kitchencraft/pages/homepage/carousel_and_tabs/gentryhero.jpg?h=774&w=1286">
          <div class="carousel-caption d-none d-md-block">
            <h5 i18n>Kitchen</h5>
            <p i18n></p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://ksassets.timeincuk.net/wp/uploads/sites/56/2020/01/Navy-blue-kitchen-Ideal-Home.jpg" class="d-block w-100" alt="https://ksassets.timeincuk.net/wp/uploads/sites/56/2020/01/Navy-blue-kitchen-Ideal-Home.jpg">
          <div class="carousel-caption d-none d-md-block">
            <h5 i18n>Kitchen</h5>
            <p i18n></p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://www.closetsbydesign.ca/wp-content/uploads/2019/02/ClosetWI_10_HRM_CBD-1140x640.jpg" class="d-block w-100" alt="https://www.closetsbydesign.ca/wp-content/uploads/2019/02/ClosetWI_10_HRM_CBD-1140x640.jpg">
          <div class="carousel-caption d-none d-md-block">
            <h5 i18n>Bathroom</h5>
            <p i18n></p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span i18n class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span i18n class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- <div class="my-container">
      <h4>About Us</h4>
    </div> -->
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
