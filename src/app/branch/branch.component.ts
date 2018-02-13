import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
//   selector: 'app-root',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {
      
  locations = [
  'Fortis Escorts Heart Institute, Okhla Road',
  'Fortis Flt. Lt. Rajan Dhall Hospital, Vasant Kunj',
  'Fortis Hospital, Shalimar Bagh'
  ];
  
  check:any;
 changecolor(location){
 
    this.check=location;
    
 } 
       changeMe(location){          
            return this.check==location;
       }

       
}
