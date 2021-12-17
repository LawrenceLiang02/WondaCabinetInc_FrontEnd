import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order',
  template: `
    <form>
      <div class="form-group">
        <label>Reference Name</label>
        <input type="text" class="form-control" id="cabinetType" placeholder="Kitchen">
      </div>
      <div class="form-group">
        <label>Color (please reference to <a href="https://www.benjaminmoore.com/en-ca/colour-overview">BenjaminMoore</a> catalog)</label>
        <input type="text" class="form-control" id="color" placeholder="#000000">
      </div>
      <div class="form-group">
      <label for="select_handle">Material</label>
      <select class="form-control" id="material">
        <option>Oak</option>
        <option>Maple</option>
        <option>Medium-density fibreboard</option>
      </select>
      </div>
      <!-- <div class="form-group">
      <label for="select_handle">Paint Type</label>
      <select class="form-control" id="paint_type">
        <option>Spray</option>
        <option>Wrapped</option>
      </select>
      </div> -->
      <div class="form-group">
      <label for="select_handle">Select a handle</label>
      <select class="form-control" id="handle_type">
        <option>Square</option>
        <option>Round</option>
        <option>Knob</option>
      </select>
      </div>
      <div>
        <label for="exampleFormControlTextarea1">Additional Items</label>
        <textarea class="form-control" id="additional_items" rows="3" placeholder="E.g. Lazy Suzan, Spice Rack"></textarea>
      </div>
      <div>
      <button type="submit" class="btn btn-primary mb-2">Submit</button>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class AddOrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
