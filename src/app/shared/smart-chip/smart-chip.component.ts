import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-smart-chip',
  templateUrl: './smart-chip.component.html',
  styleUrls: ['./smart-chip.component.css']
})
export class SmartChipComponent implements OnInit {

  @Input() items: any[];
  @Input() autoCompleteItems: any[];
  @Input() showAutocomplete: boolean;
  @Input() itemKey: string;
  @Input() itemValueKey: string;

  @Output("selectedChip") selectedChip: EventEmitter<any> = new EventEmitter();
  @Output("removeChip") removeChip: EventEmitter<any> = new EventEmitter();
  @Output("addToFavChip") addToFavChip: EventEmitter<any> = new EventEmitter();
  @Output("addChip") addChip: EventEmitter<any> = new EventEmitter();
  @Output("autocompleteEvent") autocompleteEvent: EventEmitter<any> = new EventEmitter();


  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  separatorKeysCodes = [ENTER, COMMA];

  itemCtrl = new FormControl();

  filteredItems: Observable<any[]>;

  @ViewChild('itemInput') itemInput: ElementRef;

  constructor() {

    this.autoCompleteItems = this.autoCompleteItems == null ? [] : this.autoCompleteItems;

    this.itemCtrl.valueChanges
    .subscribe(
      (query)=>{
        console.log("query is ", query)
        this.autocompleteEvent.next(query)
      }
    )
  }

  ngOnInit(): void {  
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log("event is ", event)
    // Add our fruit
    if ((value || '').trim()) {
     // this.items.push({ sct: null, name: value.trim() });
      this.addChip.next({ [this.itemKey]: null, [this.itemValueKey]: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: any): void {
    this.removeChip.next(item)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let value = event.option.value;
    console.log("value is ", value)
    this.addChip.next(value);
    this.itemInput.nativeElement.value = '';
  }
}
