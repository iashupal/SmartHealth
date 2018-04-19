import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartChipComponent } from './smart-chip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule, MatChipsModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule, MatInputModule,
    MatChipsModule, MatAutocompleteModule
  ],
  declarations: [SmartChipComponent],
  exports: [SmartChipComponent]
})
export class SmartChipModule { }
