import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './gen-examination.component.html',
  styleUrls: ['../ehr.component.css'],
})
export class GenExaminationComponent implements OnInit {
  options = [
    'one',
    'two',
    'three',
    'thirteen'
  ];

  ngOnInit() {
  }
  
}
