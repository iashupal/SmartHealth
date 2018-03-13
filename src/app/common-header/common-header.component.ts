import { selector } from 'rxjs/operator/publish';
import { APPOINTMENT_CONSTANTS } from '../appointment/appointment.constants';
import { Component, OnInit } from '@angular/core';
import { MATERIAL_APPOINTMENT_CONSTANTS } from '../material-appointment/material-appointment.constants';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent implements OnInit {

  appointmenConstant = MATERIAL_APPOINTMENT_CONSTANTS;

  constructor() { }

  ngOnInit() {
  }

}
