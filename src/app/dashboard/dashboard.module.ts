import { environment } from '../../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from "./dashboard.component";
import { 
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
 } from "@angular/material";
import { DashboardHeaderComponent } from "./dashboard-header/dashboard-header.component";
import { DashboardService } from "./dashboard.service";
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { FlexLayoutModule, BreakPoint, BREAKPOINTS, validateSuffixes, DEFAULT_BREAKPOINTS } from '@angular/flex-layout';
import { CalendarModule } from 'angular-calendar';
import {MatCardModule} from '@angular/material/card';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { CommonHeaderModule } from '../common-header/common-header.module';


function updateBreakpoints( it: BreakPoint ): any {
  console.log( it );
  switch ( it.alias ) {
    case 'lt-md': it.mediaQuery = 'screen and (max-width: 1024px)'; break;
    case 'lt-lg': it.mediaQuery = 'screen and (max-width: 1919px)'; break;
  }
  return it;
}

const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatSidenavModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    CommonModule,
    CalendarModule.forRoot(),
    MatCardModule,
    CommonHeaderModule
  ],
  declarations: [
      DashboardComponent,
      DashboardHeaderComponent,
      CalendarHeaderComponent
  ],
  exports: [],
  providers: [ 
    {
    provide: BREAKPOINTS,
    useFactory: function customizeBreakPoints() {
      return validateSuffixes(DEFAULT_BREAKPOINTS.map(updateBreakpoints));
    }
  }, 
  DashboardService ],
})
export class DashboardModule {
 
}
