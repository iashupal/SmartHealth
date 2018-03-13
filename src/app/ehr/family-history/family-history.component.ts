import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['../ehr.component.css','../history/history.component.css'],
})
export class FamilyHistoryComponent implements OnInit {
options = [
  'one',
  'two',
  'three',
  'thirteen'
];
  ngOnInit() {
  }
  
}
