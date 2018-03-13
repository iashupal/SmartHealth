import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      'gender': '',
      'number': '',
      state: '',
      country: '',
      occupation: '',
      document: ''

    });
  }

  ngOnInit() {
  }

}
