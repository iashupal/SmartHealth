import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

Login(form) {
console.log(form.value);
}
  constructor() {
    
   }

  ngOnInit() {
    $('.footer p').css('color', 'red');
  }

}
