import { Component, OnInit  } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
// import { count } from 'rxjs/operators';

@Component({
  selector: 'app-p-complaint',
  templateUrl: './p-complaint.component.html',
  styleUrls: ['../ehr.component.css','./p-complaint.component.css'],
})
export class PComplaintComponent{
  
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  pills = [
    { name: 'Headache' },
  { name: 'Chest Discomfort' },
  { name: 'Dyspnea' },
  { name: 'Edema' },
  { name: 'Cyanosis' },
  { name: 'Headache' },
  { name: 'Chest Discomfort' },
  { name: 'Dyspnea' },
  { name: 'Edema' },
  { name: 'Cyanosis' },
  { name: 'Headache' },
  { name: 'Chest Discomfort' },
  { name: 'Dyspnea' },
  { name: 'Edema' },
  { name: 'Cyanosis' },
  ];

  selects = [
    {name: 'Headache' },
    {name: 'Headache'}
  ];
  addition = [
    { name: 'Headache'},
  ];


  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.pills.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(pill: any): void {
    let index = this.pills.indexOf(pill);

    if (index >= 0) {
      this.pills.splice(index, 1);
    }
  }
  removediv(select: any): void {
    let index = this.selects.indexOf(select);
    if (index >= 0) {
      this.selects.splice(index, 1);
    }
  }
}
