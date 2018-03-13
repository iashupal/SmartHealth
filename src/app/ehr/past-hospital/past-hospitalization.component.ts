import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-past-hospitalization',
  templateUrl: './past-hospitalization.component.html',
  styleUrls: ['../ehr.component.css'],
})
export class PastHospitalizationComponent implements OnInit {
options = [
  'one',
  'two',
  'three',
  'thirteen'
];
  ngOnInit() {
  }
  
}
