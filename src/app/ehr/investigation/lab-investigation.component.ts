import { Component, OnInit  } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { SuggestionModel } from "../../models/suggestion.model";
import { SCT_NUMBERS } from "../../constants/sct.constant";
import { EHRService } from "../../services/ehr.service";
import { DynamicSuggestionModel } from "../../models/dynamic-suggestion.model";
// import { count } from 'rxjs/operators';
@Component({
  selector: 'app-lab-investigation',
  templateUrl: './lab-investigation.component.html',
  styleUrls: ['../ehr.component.css','./labimage-investigation.component.css'],
})
export class LabInvestigationComponent {

staticSuggestions: SuggestionModel[] = [];
dynamicSuggestions: DynamicSuggestionModel[] = [];
selectedSuggestions: any[] = [];

constructor(private ehrService: EHRService){
    
  }

 ngOnInit(): void {
    this.getStaticSuggestions();
  }

 removeStaticSuggestion(suggestion: SuggestionModel): void {
    console.log("removeStaticSuggestion called! ", suggestion)
    const index = this.staticSuggestions.indexOf(suggestion);
    if (index >= 0) {
      this.staticSuggestions.splice(index, 1);
    }
  }
 selectedStaticSuggestion(suggestion : SuggestionModel): void{
    console.log("selectedStaticSuggestion called! ", suggestion)
    let newSuggestion = new DynamicSuggestionModel();
    newSuggestion.name = suggestion.suggestion;
    newSuggestion.sct = suggestion.suggestion_sct;
    this.addDynamicSuggestion(newSuggestion)
    this.removeStaticSuggestion(suggestion)
  }

  removeDynamicSuggestion(suggestion: DynamicSuggestionModel): void {
    console.log("removeDynamicSuggestion called! ", suggestion)
    const index = this.selectedSuggestions.indexOf(suggestion);
    if (index >= 0) {
      this.selectedSuggestions.splice(index, 1);
    }
  }

   selectedDynamicSuggestion(suggestion : any): void{
    console.log("selectedDynamicSuggestion called! ", suggestion)
  }

addDynamicSuggestion(suggestion: DynamicSuggestionModel): void {
    console.log("addDynamicSuggestion callded! ",suggestion)
    let isDuplicate = false;
    for(let s of this.selectedSuggestions){
      if(s.name.trim().toLowerCase() == suggestion.name.trim().toLowerCase()){
        isDuplicate = true;
      }
    }
    if(!isDuplicate){
      this.selectedSuggestions.push(suggestion)    
    }
  }
addToFav(suggestion : any): void{
    console.log("add to fav called! ", suggestion)
    suggestion.isFav = !suggestion.isFav;
  }



getStaticSuggestions(){
    this.ehrService.getStaticSuggestions(SCT_NUMBERS.LAB_INVESTIGATION_SCT).subscribe(
      (data) => { 
        console.log("data is ", JSON.stringify(data))
        this.staticSuggestions = data['page_results'];
      },
      (error) => {
        console.log("error is ", error)
      }
    )
  }

getDynamicSuggestions(query){   
    this.ehrService.getDynamicSuggestions(query,SCT_NUMBERS.LAB_INVESTIGATION_SCT).subscribe(
      (data) => { 
        console.log("data is ", JSON.stringify(data))
        this.dynamicSuggestions = data;
      },
      (error) => {
        console.log("error is ", error)
      }
    )
  }


}
