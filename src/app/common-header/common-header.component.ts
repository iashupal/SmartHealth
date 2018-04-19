import { selector } from 'rxjs/operator/publish';
import { APPOINTMENT_CONSTANTS } from '../appointment/appointment.constants';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MATERIAL_APPOINTMENT_CONSTANTS } from '../material-appointment/material-appointment.constants';
import { LOCALSTORAGE_VARIABLES } from '../constants/common-constants';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent implements OnInit, OnChanges {

  appointmenConstant = MATERIAL_APPOINTMENT_CONSTANTS;
  loggedIn_User_Id: string;
  loggedIn_User_Salutation: string;
  loggedIn_First_Name: string;
  loggedIn_Last_Name: string;
  loggedIn_BranchId: string;
  errorMsg: string;
  errorStatusCode: number;
  @Input('showSearchBar') showSearchBar: boolean;
  @Input('showAddPatientBtn') showAddPatientBtn: boolean;
  @Input('showAddWalkinBtn') showAddWalkinBtn: boolean;

  constructor(private msgService: MessageService, private authService: AuthService, private router: Router) {
    this.msgService.Get_LocalStorage_Observable().subscribe(value => {
      this.loggedIn_User_Id = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_ID);
      this.loggedIn_User_Salutation = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_SALUTATION);
      this.loggedIn_First_Name = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_FIRST_NAME);
      this.loggedIn_Last_Name = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_LAST_NAME);
      this.loggedIn_BranchId = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_BRANCH_ID);
    });
  }

  ngOnInit() {
    this.loggedIn_User_Id = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_ID);
    this.loggedIn_User_Salutation = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_SALUTATION);
    this.loggedIn_First_Name = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_FIRST_NAME);
    this.loggedIn_Last_Name = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_LAST_NAME);
    this.loggedIn_BranchId = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_BRANCH_ID);
  }

  ngOnChanges() {
  }

  logoutApplication() {
    this.loggedIn_BranchId = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_BRANCH_ID);
    this.authService.Logout_Application(this.loggedIn_BranchId).subscribe(data => {
      this.authService.ClearLocalStorage();
      this.router.navigateByUrl('/login');
    },
    (error: HttpErrorResponse) => {
      this.errorStatusCode = error.status;
      this.errorMsg = error.message;
    });
  }

}
