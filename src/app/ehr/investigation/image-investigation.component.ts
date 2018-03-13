import { Component, OnInit  } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
// import { count } from 'rxjs/operators';
@Component({
  selector: 'app-image-investigation',
  templateUrl: './image-investigation.component.html',
  styleUrls: ['../ehr.component.css','./labimage-investigation.component.css'],
})
export class ImageInvestigationComponent {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  pills = [
    { name: 'WBC Count' },
  { name: 'RBC Count' },
  { name: 'Hematocrit(PCV)' },
  { name: 'Platelet Count' },
  { name: 'WBC Count' },
  { name: 'RBC Count' },
  { name: 'Hematocrit(PCV)' },
  { name: 'Platelet Count' },
  { name: 'WBC Count' },
  { name: 'RBC Count' },
  { name: 'Hematocrit(PCV)' },
  { name: 'Platelet Count' },
  ];

  options = [
    'one',
    'two',
    'three',
    'thirteen'
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
}
