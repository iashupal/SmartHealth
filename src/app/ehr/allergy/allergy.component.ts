import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-allergy',
  templateUrl: './allergy.component.html',
  styleUrls: ['../ehr.component.css'],
})
export class AllergyComponent implements OnInit {

  options = [
    'one',
    'two',
    'three',
    'thirteen'
  ];

  ngOnInit() {
  }
  
}
