import { PatientAppointmentProfile } from '../models/patient-appointment-profile.model';
import { DASHBOARD_CONSTANTS } from './dashboard.constants';
import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import 'rxjs/add/operator/map';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes, setDay } from 'date-fns';
import { CustomCalendarEvent } from './custom-calendar-event.interface';
import { DashboardService } from './dashboard.service';
import { CalendarHeaderCountResModel } from '../models/auth.model';
import { LOCALSTORAGE_VARIABLES } from '../constants/common-constants';
import { MessageService } from '../services/message.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

  dashboardConstant = DASHBOARD_CONSTANTS;
  showCheckIn: boolean = true;
  showStartConsult: boolean = false;
  showCancelBlock: boolean = false;
  public menuMode = 'side';
  opened: boolean = true;
  view = this.dashboardConstant.WEEK;
  viewDate: Date = new Date();
  displayEvents: CustomCalendarEvent[] = [];
  dbEvents: CustomCalendarEvent[] = [];
  calendarHeaderCountResModel: CalendarHeaderCountResModel = new CalendarHeaderCountResModel();
  patientAppointmentProfile: PatientAppointmentProfile = new PatientAppointmentProfile()
  selectedHeaderItem : string  = this.dashboardConstant.ALL;
  branchId: any;
  

  @ViewChild(MatSidenav) sidenav: MatSidenav
  @ViewChildren('out', { read: ElementRef }) menuButtons: QueryList<ElementRef>

  constructor(private media: ObservableMedia, private dashboardService: DashboardService, private msgService: MessageService){
    console.log('localStorage in constructor first', localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_FIRST_NAME));
    console.log('localStorage in constructor branch', localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_BRANCH_ID));
    this.media.subscribe((mediaChange: MediaChange) => {
      this.menuMode = this.getMode(mediaChange);
      this.opened = this.getOpened(mediaChange);
    });

    this.displayEvents = this.sortCalendarEventByAppointmentDate(this.dashboardService.events);
    this.dbEvents = this.sortCalendarEventByAppointmentDate(this.dashboardService.events);

    this.branchId = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_BRANCH_ID);
    this.msgService.Get_LocalStorage_Observable().subscribe(date => {
      this.branchId = localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_BRANCH_ID);
    });
  }

  ngOnInit(): void {
    this.getCalendarHeaderCount();
    this.getDefaultPatientAppointmentProfileById();
    console.log('localStorage in oninit first', localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_FIRST_NAME));
    console.log('localStorage in oninit branch', localStorage.getItem(LOCALSTORAGE_VARIABLES.LOGGED_IN_USER_BRANCH_ID));
  }

  private getMode(mediaChange: MediaChange): string {
    if (this.media.isActive('lt-md')) {
      return 'over';
    } else {
      return 'side';
    }
  }

  private getOpened(mediaChange: MediaChange): boolean {
    if (this.media.isActive('lt-md')) {
      console.log(" false ")
//      return false;
      return true;
    } else {
      console.log(" true ")      
      return true;
    }
  }

  toggleSidenav(){
    this.opened = !this.opened;
  }

  sidenavIsClosing(){
    this.opened = false
  }

  dayClicked(dayEvent){
    console.log("day clicked ", dayEvent)
    //alert("day clicked " + JSON.stringify(dayEvent))
    this.view = this.dashboardConstant.DAY;
    this.viewDate = dayEvent.date;
    return
  }

  handleEvent(eventType, event){
    console.log("handle event ", eventType)
    console.log(" handleEvent ", event)
    if(this.view == this.dashboardConstant.MONTH){
      this.view = this.dashboardConstant.DAY;
      this.viewDate = event.start;
      return
    }

    if(this.view == this.dashboardConstant.DAY || this.view == this.dashboardConstant.WEEK){
      this.opened = true;
      this.getPatientAppointmentProfileById(event.id)
    }
    //alert(" handleEvent " +JSON.stringify(event))
  }

  onDayHeaderClickInWeekView(event) {
    console.log('event is', event);
    this.view = this.dashboardConstant.DAY;
    console.log('event.day.date', event.day.date);
    this.viewDate = event.day.date;
  }

  eventTimesChanged(event) {
    console.log('event time changed', event);
  }

  viewDateChange(event) {
    console.log('viewDateChange', event);
  }

  viewChange(event) {
    console.log('viewChange', event);
    this.getCalendarHeaderCount();
  }

  showCheckInBlock(){
    this.resetBlock(true, false, false);
  }

  showStartConsultBlock(){
    this.resetBlock(false, true, false);
  }
  
  showCancelAndRescheduleConsultBlock(){
    this.resetBlock(false, false, true);
  }

  resetBlock(showCheckIn, showStartConsult, showCancelBlock){
    this.showCheckIn = showCheckIn;
    this.showStartConsult = showStartConsult;
    this.showCancelBlock = showCancelBlock;
  }

  onAppointmentStatusChange(appointmentStatus) {

    this.selectedHeaderItem = appointmentStatus;

    if(appointmentStatus == this.dashboardConstant.ALL){
      this.displayEvents = Object.create(this.dbEvents)
      return;
    }

    this.displayEvents = this.dbEvents.filter(event => {
      if(event.appointmentStatus == appointmentStatus){
        return true;
      }
      return false;
    })
  }

  getCalendarHeaderCount() {
    const date_type = this.GetDateTypeFromView();
    this.dashboardService.getCalendarHeaderCount(this.branchId, date_type).subscribe(data => {
      this.calendarHeaderCountResModel = new CalendarHeaderCountResModel();
      this.calendarHeaderCountResModel.ALL = data.ALL;
      this.calendarHeaderCountResModel.PENDING = data.PENDING;
      this.calendarHeaderCountResModel.CHECKED_IN = data.CHECKED_IN;
      this.calendarHeaderCountResModel.CANCELLED = data.CANCELLED;
      this.calendarHeaderCountResModel.CHECKED_OUT = data.CHECKED_OUT;
      console.log('this.calendarHeaderCountResModel', this.calendarHeaderCountResModel);
    },
    (error: HttpErrorResponse) => {
      console.log('error in calendar count component', error);
    });
  }

  GetCalendarAppointmentDetail() {
    const date_type = this.GetDateTypeFromView();
    // this.dashboardService.GetCalendarAppointmentList()
  }

  GetDateTypeFromView() {
    let date_type: string;
    switch (this.view) {
      case DASHBOARD_CONSTANTS.DAY:
        date_type = 'DAILY';
        break;
      case DASHBOARD_CONSTANTS.WEEK:
        date_type = 'WEEKLY';
        break;
      case DASHBOARD_CONSTANTS.MONTH:
        date_type = 'MONTH';
        break;
    }
    return date_type;
  }

  getDefaultPatientAppointmentProfileById(){
    this.dashboardService.getDefaultPatientAppointmentProfileById().subscribe(
      (data :  PatientAppointmentProfile) => {
        this.patientAppointmentProfile = data;
      },
      (error)=>{
        console.error("Error while fetching default patient")
      }
    )
  }

  getPatientAppointmentProfileById(id: number){
    this.dashboardService.getPatientAppointmentProfileById(id).subscribe(
      (data :  PatientAppointmentProfile) => {
        this.patientAppointmentProfile = data;
      },
      (error)=>{
        console.error("Error while fetching default patient")
      }
    )
  }



  sortCalendarEventByAppointmentDate(events){
    return (events || []).sort((a, b) => a.appointmentDate < b.appointmentDate ? -1 : 1);
  }
}
