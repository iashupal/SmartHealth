import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-treatment',
  templateUrl: './current-treatment.component.html',
  styleUrls: ['../ehr.component.css'],
})
export class CurrentTreatmentComponent {
  
  options = [
    'one',
    'two',
    'three',
    'thirteen'
  ];
}
