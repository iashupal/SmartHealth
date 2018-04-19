import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { UserProfileResponseModel, UserBranchResponseModel, City, State, Country, Locality, BranchInfo } from '../models/auth.model';
import { LOCALSTORAGE_VARIABLES } from '../constants/common-constants';
import { VALIDATION_MESSAGES } from '../constants/validation-messages';
import { MatRadioChange } from '@angular/material';
import { CommonHeaderComponent } from '../common-header/common-header.component';
import Cookies from 'js-cookie';
declare var getAllCookies: any;

@Component({
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit, AfterViewInit {

  errorMessage: string;
  errorStatusCode: number;
  VALIDATION_MESSAGES = VALIDATION_MESSAGES;
  showBranchIdErrorMsg = false;
  selectedBranch: BranchInfo;
  branchForm: FormGroup;
  check: any;
  city: City;
  locality: Locality;
  state: State;
  country: Country;
  branchInfo: BranchInfo;
  userProfileResponseModel: UserProfileResponseModel;
  userBranchResponseModel: UserBranchResponseModel;
  Branch_Id: number;
  Branch_HIS_Integration_Flag: boolean;
  @ViewChild('commonHeaderComponent') commonHeaderComponent: CommonHeaderComponent;

  constructor(private authService: AuthService, private router: Router, private msgService: MessageService) {
    this.branchForm = new FormGroup({
      branchListControl: new FormControl('', Validators.required)
    });
    this.userProfileResponseModel = {
      id: null,
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      is_active: null,
      specialisation: null,
      qualification: null,
      mci_number: null,
      image: null,
      mobile: null
    };
    this.locality = {
      id: null,
      name: null
    };
    this.city = {
      id: null,
      name: null,
    };
    this.state = {
      id: null,
      name: null
    };
    this.country = {
      id: null,
      name: null
    };
    this.branchInfo = {
      id: null,
      name: null,
      logo: null,
      contact_number: null,
      contact_email: null,
      address: null,
      pincode: null,
      branch_type: null,
      locality: this.locality,
      city: this.city,
      state: this.state,
      country: this.country
    };
    this.userBranchResponseModel = {
        page_count: null,
        page_results: null,
        total_count: null
    };
  }

  ngOnInit() {

    this.authService.Get_organisation_users_pofile().subscribe(
      data => {
        console.log('profile in component', data);
        this.userProfileResponseModel.id = data.id;
        this.userProfileResponseModel.username = data.username;
        this.userProfileResponseModel.first_name = data.first_name;
        this.userProfileResponseModel.last_name = data.last_name;
        this.userProfileResponseModel.email = data.email;
        this.userProfileResponseModel.image = data.image;
        this.userProfileResponseModel.is_active = data.is_active;
        this.userProfileResponseModel.mci_number = data.mci_number;
        this.userProfileResponseModel.mobile = data.mobile;
        this.userProfileResponseModel.qualification = data.qualification;
        this.userProfileResponseModel.specialisation = data.specialisation;
        // Set LocalStorage Variables
        localStorage.setItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_SALUTATION, '');
        localStorage.setItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_FIRST_NAME, this.userProfileResponseModel.first_name);
        localStorage.setItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_LAST_NAME, this.userProfileResponseModel.last_name);
        localStorage.setItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_ID, this.userProfileResponseModel.id.toString());
        this.msgService.Update_LocalStorage_Subject();
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
        this.errorStatusCode = error.status;
        console.log('Branch Profile Error', error);
        if (this.errorStatusCode === 401) {
          this.router.navigateByUrl('/login');
        }
      }
    );

    this.authService.Get_organisation_users_branches().subscribe(
      data => {
        console.log('branches list in component', data);
        this.userBranchResponseModel = data;
        console.log('userBranchResponseModel', this.userBranchResponseModel);
        console.log('userBranchResponseModel BrranchINFO', this.userBranchResponseModel.page_results);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
        this.errorStatusCode = error.status;
        console.log('Branch Branch Error', error);
        if (this.errorStatusCode === 401) {
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  ngAfterViewInit() {
  }

  update_Organisation_Users_logs() {
    if (this.branchForm.valid) {
      this.authService.post_organisation_user_logs(this.selectedBranch.id).subscribe(
        data => {
          console.log('orranistion user log data', data);
          localStorage.setItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_BRANCH_ID, this.selectedBranch.id.toString());
          this.router.navigateByUrl('/dashboard');
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
          this.errorStatusCode = error.status;
          console.log('orrganistion user logs error', error);
        }
      );
    } else {
      this.showBranchIdErrorMsg = true;
    }
  }

  onBranchSelection(event: MatRadioChange) {
    this.showBranchIdErrorMsg = false;
    this.selectedBranch = event.value;
    localStorage.setItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_BRANCH_ID, this.selectedBranch.id.toString());
    this.msgService.Update_LocalStorage_Subject();
  }
}
