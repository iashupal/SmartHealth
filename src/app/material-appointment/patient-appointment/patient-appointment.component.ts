import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MATERIAL_APPOINTMENT_CONSTANTS } from '../material-appointment.constants';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit {

  selectedIndex: number = 1;

  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        console.log("params ", params)
        let tabName = params.tabName;
        if(tabName == MATERIAL_APPOINTMENT_CONSTANTS.EXISTING_PATIENT_TAB){
          this.selectedIndex = 1;
        }else{
          this.selectedIndex = 0;
        }
      }
    )

  }

}
