import { Component, OnInit  } from '@angular/core';
import { FormControl } from '@angular/forms';
// import  { FormControl } from 'angular/forms';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['../ehr.component.css'],
})
export class TreatmentComponent {

  myControl: FormControl = new FormControl();
  options = [
    '3 days',
    '4 days',
    '5 days',
    '6 days',
    '7 days',
  ];
// Control: FormControl = new FormControl();
  points = [
    '1 capsule',
    '2 capsule',
    '3 capsule',
  ];
  selects = [
    'After Food',
    'During Food',
    'Before Food',
  ];
  
}
