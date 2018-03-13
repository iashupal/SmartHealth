import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-medical-condition',
  templateUrl: './medical-condition.component.html',
  styleUrls: ['../ehr.component.css','../history/history.component.css'],
})
export class MedicalConditionComponent implements OnInit {
options = [
  'one',
  'two',
  'three',
  'thirteen'
];
  ngOnInit() {
  }
  
}
