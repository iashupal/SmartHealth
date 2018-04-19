import { Component, OnInit  } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatAutocompleteSelectedEvent } from '@angular/material';
import { EHRService } from "../../services/ehr.service";
import { SCT_NUMBERS } from "../../constants/sct.constant";
import { Observable } from "rxjs/Rx";
import { DynamicSuggestionModel } from "../../models/dynamic-suggestion.model";
@Component({
  selector: 'app-allergy',
  templateUrl: './allergy.component.html',
  styleUrls: ['../ehr.component.css'],
})
export class AllergyComponent implements OnInit {
   allergyForm: FormGroup;
   alleryAsynchSuggestion: Observable<any[]>;
  reactionAsynchSuggestion: Observable<any[]>;


   constructor(private ehrService: EHRService){
    
  }
  ngOnInit() {
     this.allergyForm = new FormGroup({
     'add' : new FormArray([this.buildFormGroup()])
    });
  }
  onSubmit(){
    console.log(this.allergyForm);
  }

  buildFormGroup(): any{
    let form: FormGroup = new FormGroup({
      allergicTo: new FormControl(null),
      allergicReaction: new FormControl(null)
    });

    form.controls['allergicTo'].valueChanges.subscribe(
      (query) => {
        console.log("query is ", query)
        if(query == ""){
          return
        }
        this.loadAllergicSeggessions(query, SCT_NUMBERS.ALLERGY_INVESTIGATION_SCT);
      }
    )

    form.controls['allergicReaction'].valueChanges.subscribe(
      (query) => {
        console.log("query is ", query)
        if(query == ""){
          return
        }
        this.loadReactionSeggessions(query,  SCT_NUMBERS.ALLERGY_INVESTIGATION_SCT);
      }
    )
    return form;
  }
    
    
   addNewRow() {
        const control = new FormControl(null);
        (<FormArray>this.allergyForm.get('add')).push(this.buildFormGroup())  
    }
    removeRow(index: number) {
      const control = <FormArray>this.allergyForm.controls['add'];
      control.removeAt(index);
    }

    save(){
      console.log(JSON.stringify(this.allergyForm.value))
    }

    loadAllergicSeggessions(query, sct){
       this.ehrService.getDynamicSuggestions(query, sct)
       .subscribe(
       (data) => { 
         console.log("data is ", JSON.stringify(data))
         this.alleryAsynchSuggestion = Observable.of(data);
       },
        (error) => {
          console.log("error is ", error)
        }
      )
    }

    loadReactionSeggessions(query, sct){
       this.ehrService.getDynamicSuggestions(query, sct)
       .subscribe(
       (data) => { 
         console.log("data is ", JSON.stringify(data))
         this.reactionAsynchSuggestion = Observable.of(data);
       },
        (error) => {
          console.log("error is ", error)
        }
      )
    }

    displayDynamicSuggestion(suggestion?: DynamicSuggestionModel): string | undefined {
      return suggestion ? suggestion.name : undefined;
    }

}
