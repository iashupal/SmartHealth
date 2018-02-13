import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatIconModule, MatButtonModule, MatSelectModule, MatInputModule, MatTooltipModule, MatCardModule,
  MatCheckboxModule, MatSidenavModule, MatChipsModule, MatToolbarModule, MatRadioModule, MatMenuModule
} from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { BranchComponent } from './branch/branch.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppointmentComponent } from './appointment/appointment.component';


@NgModule({
  declarations: [
    LoginComponent,
    BranchComponent,
    CalendarComponent,
    AppComponent,
    AppointmentComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule, MatButtonModule, MatSelectModule, MatInputModule, MatTooltipModule, MatCheckboxModule,
    MatSidenavModule, MatAutocompleteModule, MatCardModule, MatChipsModule, MatToolbarModule, MatRadioModule, MatMenuModule,
    MatIconModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'branch',
        component: BranchComponent
      },
      {
        path:'appointment',
        component:AppointmentComponent
      },
      
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
