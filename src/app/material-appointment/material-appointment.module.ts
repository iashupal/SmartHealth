import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { ExistingPatientComponent } from './existing-patient/existing-patient.component';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { MaterialAppointmentService } from './material-appointment.service';
import { CommonHeaderModule } from '../common-header/common-header.module';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FixAppointmentModalComponent } from './fix-appointment-modal/fix-appointment-modal.component';
import { MatDialogModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MaterialTimeControlModule } from '../shared/time-picker/material-time-control.module';
import {MatIconModule} from '@angular/material/icon';
const routes: Routes = [
  { path: '', redirectTo: 'type/0/tab/NEW_PATIENT'},
  //{ path: '**', redirectTo: 'type/0/tab/NEW_PATIENT'},
  { path: 'type/:typeId/tab/:tabName', component: PatientAppointmentComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    CommonHeaderModule,
    MatDialogModule,
    MatAutocompleteModule,
    MaterialTimeControlModule,
    MatIconModule 
  ],
  entryComponents:[FixAppointmentModalComponent],
  declarations: [PatientAppointmentComponent, RegisterPatientComponent, ExistingPatientComponent, FixAppointmentModalComponent],
  providers: [MaterialAppointmentService]
})
export class MaterialAppointmentModule { }
