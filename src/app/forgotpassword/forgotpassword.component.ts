import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  template: `
    <p>
      forgotpassword works!
    </p>
  `,
  styles: [
  ]
})
export class ForgotpasswordComponent implements OnInit {

  form: any = {
    email: null,
    passwordToken: null,
    newPassword: null
  }
  constructor() { }

  ngOnInit(): void {
  }

}
