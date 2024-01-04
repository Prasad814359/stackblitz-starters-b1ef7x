import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  formValue = new FormGroup({
    address: new FormControl('89 Simone Weil Avenue, Webton')
  })

  get getAddressValue() {
    return this.formValue.get('address').value
  }

  ngOnInit() {}

  updateSingleField(control): void {
    console.log(`${control} field got updated to ${this.getAddressValue}`)
  }

  // cancelSingleField(control): void {
  //   console.log('cancel single field')
  // }
}
