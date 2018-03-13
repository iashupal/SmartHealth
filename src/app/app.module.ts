import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatIconModule, MatButtonModule, MatSelectModule, MatInputModule, MatTooltipModule, MatCardModule,
  MatCheckboxModule, MatSidenavModule, MatChipsModule, MatToolbarModule, MatRadioModule, MatMenuModule, MatTabsModule, MatDatepickerModule,
  MatNativeDateModule, MatOptionModule
} from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CookieModule } from 'ngx-cookie';
import { BranchComponent } from './branch/branch.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { EHRComponent } from './ehr/ehr-container/ehr.component';
import { menuHoverDirective } from './menuHover.directive';


import { VitalComponent } from './ehr/vital/vital.component';
import { CurrentTreatmentComponent } from './ehr/current-treatment/current-treatment.component';
import { HistoryComponent } from './ehr/history/history.component';
import { AllergyComponent } from './ehr/allergy/allergy.component';
import { MedicalConditionComponent } from './ehr/medical-condition/medical-condition.component';
import { SocialHistoryComponent } from './ehr/social-history/social-history.component';
import { FamilyHistoryComponent } from './ehr/family-history/family-history.component';
import { PastHospitalizationComponent } from './ehr/past-hospital/past-hospitalization.component';
import { GynaeHistoryComponent } from './ehr/gynae-history/gynae-history.component';
import { PComplaintComponent } from './ehr/presenting-complaint/p-complaint.component';
import { InvestigationComponent } from './ehr/investigation/investigation.component';
import { LabInvestigationComponent } from './ehr/investigation/lab-investigation.component';
import { ImageInvestigationComponent } from './ehr/investigation/image-investigation.component';
import { CrossRefComponent } from './ehr/cross-referral/cross-ref.component';
import { GenExaminationComponent } from './ehr/general-examination/gen-examination.component';
import { TreatmentComponent } from './ehr/treatment-plan/treatment.component';

import { AppRoutingModule }  from './app-routing.module';

//Merge
import { CoreServices } from './core.service';
import { NoopHttpInterceptor } from './http-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ApiUrlService } from './services/apiUrl.service';
import { UtilService } from './services/util.service';
import { CoreHttpService } from './services/coreHttp.service';

@NgModule({
  declarations: [
    LoginComponent,
    BranchComponent,
    CalendarComponent,
    AppComponent,
    EHRComponent,
    VitalComponent,
    HistoryComponent,
    CurrentTreatmentComponent,
    AppointmentComponent,
    menuHoverDirective,
    AllergyComponent,
    MedicalConditionComponent,
    SocialHistoryComponent,
    FamilyHistoryComponent,
    PastHospitalizationComponent,
    GynaeHistoryComponent,
    PComplaintComponent,
    InvestigationComponent,
    LabInvestigationComponent,
    ImageInvestigationComponent,
    CrossRefComponent,
    GenExaminationComponent,
    TreatmentComponent
    // ExpComponent
  ],
  // entryComponents: [CurrentTreatmentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule, MatButtonModule, MatSelectModule, MatInputModule, MatTooltipModule, MatCheckboxModule,
    MatSidenavModule, MatAutocompleteModule, MatCardModule, MatChipsModule, MatToolbarModule, MatRadioModule, MatMenuModule,
    MatDatepickerModule, MatIconModule, MatTabsModule, MatNativeDateModule, HttpClientModule, MatOptionModule,
    CookieModule.forRoot() ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: NoopHttpInterceptor, multi: true}, CoreServices, AuthService,
    ApiUrlService, UtilService, CoreHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
