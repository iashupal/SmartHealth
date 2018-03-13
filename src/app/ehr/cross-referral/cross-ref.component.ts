import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-cross',
  templateUrl: './cross-ref.component.html',
  styleUrls: ['../ehr.component.css'],
})
export class CrossRefComponent implements OnInit {
options = [
  'one',
  'two',
  'three',
  'thirteen'
];
  ngOnInit() {
  }
  
}
