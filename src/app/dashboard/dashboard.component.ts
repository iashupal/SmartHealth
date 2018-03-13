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
import { AppointmentStatusCountModel } from '../models/appointment-status-count.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

  dashboardConstant = DASHBOARD_CONSTANTS
  showCheckIn: boolean = true;
  showStartConsult: boolean = false;
  showCancelBlock: boolean = false;
  public menuMode = 'side';
  opened: boolean = true;
  view = this.dashboardConstant.WEEK;
  viewDate: Date = new Date();
  displayEvents: CustomCalendarEvent[] = [];
  dbEvents: CustomCalendarEvent[] = [];
  appointmentStatusCount: AppointmentStatusCountModel = new AppointmentStatusCountModel()
  patientAppointmentProfile: PatientAppointmentProfile = new PatientAppointmentProfile()
  selectedHeaderItem : string  = this.dashboardConstant.ALL
  

  @ViewChild(MatSidenav) sidenav: MatSidenav
  @ViewChildren('out', { read: ElementRef }) menuButtons: QueryList<ElementRef>

  constructor(private media: ObservableMedia, private dashboardService: DashboardService){
    this.media.subscribe((mediaChange: MediaChange) => {
      this.menuMode = this.getMode(mediaChange);
      this.opened = this.getOpened(mediaChange);
    });

    this.displayEvents = this.sortCalendarEventByAppointmentDate(this.dashboardService.events);
    this.dbEvents = this.sortCalendarEventByAppointmentDate(this.dashboardService.events);
  }

  ngOnInit(): void { 
    this.getDefaultPatientAppointmentProfileById();
    this.getAppointmentStatusCount();
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

  onDayHeaderClickInWeekView(event){
    console.log("event is ", event)
    this.view = this.dashboardConstant.DAY;
    console.log("event.day.date ", event.day.date)
    this.viewDate = event.day.date;
  }

  eventTimesChanged(event){
    console.log("event time changed ", event)
  }

  viewDateChange(event){
    console.log("viewDateChange ", event)
    //alert("view date is "+event)
  }

  viewChange(event){
    console.log("viewChange ", event)       
    //alert("view is "+event)
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

  getAppointmentStatusCount(){
    this.appointmentStatusCount = this.dashboardService.getAppointmentStatusCount();
    console.log("this.appointmentStatusCount ", this.appointmentStatusCount)
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
