import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './branch/branch.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { EHRComponent } from './ehr/ehr-container/ehr.component';
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

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'branch',
    component: BranchComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'appointment',
    component: AppointmentComponent
  },
  {
    path: 'EHR',
    component: EHRComponent,
    children: [
      {
        path: '',
        component: VitalComponent
      },
      {
        path: 'vital',
        component: VitalComponent
      },
      {
        path: 'current-treatment',
        component: CurrentTreatmentComponent
      },

      {
        path: 'history',
        component: HistoryComponent,
        children: [
          {
            path: '',
            redirectTo: 'allergy',
            pathMatch: 'full'
          },
          {
            path: 'allergy',
            component: AllergyComponent
          },
          {
            path: 'medical-condition',
            component: MedicalConditionComponent
          },
          {
            path: 'social-history',
            component: SocialHistoryComponent
          },
          {
            path: 'family-history',
            component: FamilyHistoryComponent
          },
          {
            path: 'past-hospitalization',
            component: PastHospitalizationComponent
          },
          {
            path: 'gynae-history',
            component: GynaeHistoryComponent
          }
    ]
  },
  {
    path: 'p-complaint',
    component: PComplaintComponent
  },
  {
    path: 'investigation',
    component: InvestigationComponent,
    children: [
      {
        path: '',
        redirectTo: 'lab-investigation',
        pathMatch: 'full'
      },
      {
        path: 'lab-investigation',
        component: LabInvestigationComponent
      },
      {
        path: 'image-investigation',
        component: ImageInvestigationComponent
      }
]
  },
  {
    path: 'cross-ref',
    component: CrossRefComponent
  },
  {
    path: 'gen-examination',
    component: GenExaminationComponent
  },
  {
    path: 'treatment-plan',
    component: TreatmentComponent
  }
]},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
  },
  {
    path : 'material-appointment/:tabName',
    loadChildren : 'app/material-appointment/material-appointment.module#MaterialAppointmentModule'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }  