import { Injectable} from '@angular/core';
import { setHours, setMinutes, setDay, getTime, getMinutes, getHours } from 'date-fns';
import { CustomCalendarEvent } from './custom-calendar-event.interface';
import { AppointmentStatusCountModel } from '../models/appointment-status-count.model';
import { environment } from '../../environments/environment';
import { CoreServices } from '../core.service';
import { Observable } from 'rxjs';
import { DASHBOARD_CONSTANTS } from './dashboard.constants';
import { PatientAppointmentProfile } from '../models/patient-appointment-profile.model';

@Injectable()
export class DashboardService {

  httpOptions: any = {};

  events: CustomCalendarEvent[] = [
    {
      id: '1',
      title: 'No event end date',
      patientName: 'Gaurav',
      gender: 'M',
      age: 28,
      patientStatus:'New',
      appointmentStatus: "APPOINTMENT",
      start: this.getStartDate(setHours(setMinutes(new Date(), 30), 10)),
      appointmentDate: setHours(setMinutes(new Date(), 30), 10),
      color: {
        primary: this.getDayEventBlockBackgroundColor("APPOINTMENT"),
        secondary: this.getDayEventBlockBackgroundColor("APPOINTMENT")
      }
    },
    {
      id: "2",
      title: 'No event end date',
      patientName: "Anurag",
      gender: 'M',
      age: 28,
      patientStatus:'New',
      appointmentStatus: "APPOINTMENT",
      start: this.getStartDate(setHours(setMinutes(new Date(), 0), 10)),
      appointmentDate: setHours(setMinutes(new Date(), 0), 10),
      color: {
        primary: this.getDayEventBlockBackgroundColor("APPOINTMENT"),
        secondary: this.getDayEventBlockBackgroundColor("APPOINTMENT")
      }
    },
    {
      id: '3',
      title: 'No event end date',
      patientName: 'Navdeep',
      gender: 'M',
      age: 28,
      patientStatus:'New',
      appointmentStatus: "APPOINTMENT",
      start: this.getStartDate(setHours(setMinutes(new Date(), 5), 10)),
      appointmentDate: setHours(setMinutes(new Date(), 5), 10),
      color: {
        primary: this.getDayEventBlockBackgroundColor("APPOINTMENT"),
        secondary: this.getDayEventBlockBackgroundColor("APPOINTMENT")
      }
    },
    {
      id: '4',
      title: 'No event end date',
      patientName: 'Alok',
      gender: 'M',
      age: 28,
      patientStatus:'New',
      appointmentStatus: 'CHECKED-IN',
      start: this.getStartDate(setHours(setMinutes(new Date(), 10), 10)),
      appointmentDate: setHours(setMinutes(new Date(), 10), 10),
      color: {
        primary: this.getDayEventBlockBackgroundColor("CHECKED-IN"),
        secondary: this.getDayEventBlockBackgroundColor("CHECKED-IN")
      }
    },
    {
      id: '5',
      title: 'No event end date',
      patientName: 'Rahul',
      gender: 'M',
      age: 28,
      patientStatus:'New',
      appointmentStatus: 'CHECKED-IN',
      start: this.getStartDate(setHours(setMinutes(new Date(), 16), 11)),
      appointmentDate: setHours(setMinutes(new Date(), 16), 11),
      color: {
        primary: this.getDayEventBlockBackgroundColor("CHECKED-IN"),
        secondary: this.getDayEventBlockBackgroundColor("CHECKED-IN")
      }
    },
    {
      id: '6',
      title: 'No event end date',
      patientName: 'MRJ',
      gender: 'M',
      age: 28,
      patientStatus:'New',
      appointmentStatus: 'CANCELLED',
      start: this.getStartDate(setHours(setMinutes(setDay(new Date(), 5), 18), 11)),
      appointmentDate: setHours(setMinutes(setDay(new Date(), 5), 18), 11),
      color: {
        primary: this.getDayEventBlockBackgroundColor("CANCELLED"),
        secondary: this.getDayEventBlockBackgroundColor("CANCELLED")
      }
    },
    {
      id: '7',
      title: 'No event end date',
      patientName: 'Test1',
      gender: 'M',
      age: 28,
      patientStatus:'New',
      appointmentStatus: 'CANCELLED',
      start: this.getStartDate(setHours(setMinutes(setDay(new Date(), 5), 25), 11)),
      appointmentDate: setHours(setMinutes(setDay(new Date(), 5), 25), 11),
      color: {
        primary: this.getDayEventBlockBackgroundColor("CANCELLED"),
        secondary: this.getDayEventBlockBackgroundColor("CANCELLED")
      }
    },
    {
      id: '8',
      title: 'No event end date',
      patientName: 'Test2',
      gender: 'M',
      age: 28,
      patientStatus:'New',
      appointmentStatus: 'COMPLETED',
      start: this.getStartDate(setHours(setMinutes(setDay(new Date(), 6), 35), 11)),
      appointmentDate: setHours(setMinutes(setDay(new Date(), 6), 35), 11),
      color: {
        primary: this.getDayEventBlockBackgroundColor("COMPLETED"),
        secondary: this.getDayEventBlockBackgroundColor("COMPLETED")
      }
    },
    {
      id: '9',
      title: 'No event end date',
      patientName: 'Test3',
      gender: 'M',
      age: 28,
      patientStatus:'New',
      appointmentStatus: 'COMPLETED',
      start: this.getStartDate(setHours(setMinutes(setDay(new Date(), 6), 45), 11)),
      appointmentDate: setHours(setMinutes(setDay(new Date(), 6), 45), 11),
      color: {
        primary: this.getDayEventBlockBackgroundColor("COMPLETED"),
        secondary: this.getDayEventBlockBackgroundColor("COMPLETED")
      }
    },
    {
      id: '10',
      title: 'No event end date',
      patientName: 'Test4',
      gender: 'M',
      age: 28,
      patientStatus:'New',
      appointmentStatus: 'COMPLETED',
      start: this.getStartDate(setHours(setMinutes(setDay(new Date(), 3), 58), 11)),
      appointmentDate: setHours(setMinutes(setDay(new Date(), 3), 58), 11),
      color: {
        primary: this.getDayEventBlockBackgroundColor("COMPLETED"),
        secondary: this.getDayEventBlockBackgroundColor("COMPLETED")
      }
    },
    {
      id: '11',
      title: 'No event end date',
      patientName: 'Test5',
      gender: 'M',
      age: 28,
      patientStatus:'New',
      appointmentStatus: 'COMPLETED',
      start: this.getStartDate(setHours(setMinutes(setDay(new Date(), 3), 0), 5)),
      appointmentDate: setHours(setMinutes(setDay(new Date(), 3), 0), 5),
      color: {
        primary: this.getDayEventBlockBackgroundColor("COMPLETED"),
        secondary: this.getDayEventBlockBackgroundColor("COMPLETED")
      }
    }
  ];

  appointmentStatusCount: AppointmentStatusCountModel = new AppointmentStatusCountModel()

  API_URL: string;
  
  constructor(private coreServices: CoreServices){
      this.API_URL = environment.API_URL
    }

  getAppointmentStatusCount(){
    this.appointmentStatusCount.all = 50;
    this.appointmentStatusCount.completed = 10;
    this.appointmentStatusCount.checkedIn = 10;
    this.appointmentStatusCount.appointment = 20;
    this.appointmentStatusCount.cancelled = 10;
    return this.appointmentStatusCount;
  }

  getDefaultPatientAppointmentProfileById(): Observable<PatientAppointmentProfile>{   
    return this.coreServices.get(this.API_URL + DASHBOARD_CONSTANTS.FETCH_DEFAULT_PATIENT_APPOINTMENT_PROFILE, {});
  }

  getPatientAppointmentProfileById(id : number): Observable<PatientAppointmentProfile>{   
    return this.coreServices.get(this.API_URL + DASHBOARD_CONSTANTS.FETCH_PATIENT_APPOINTMENT_PROFILE_BY_ID, {});
  }

  getDayEventBlockBackgroundColor(status): string{
    if(status == DASHBOARD_CONSTANTS.APPOINTMENT){
      return "#d2f8e3";
    }
    if(status == DASHBOARD_CONSTANTS.CANCELLED){
      return "#ffe5ce";
    }
    if(status == DASHBOARD_CONSTANTS.CHECKED_IN){
      return "#d2f1fc";
    }
    if(status == DASHBOARD_CONSTANTS.COMPLETED){
      return "#fff3c1";
    }
    return ""
  }

  getStartDate(date){
    let minutes = getMinutes(date);
    let hours = getHours(date);
    let newDate;
    if(minutes >= 30){
      newDate = setMinutes(date, 30);
      console.log("greater than 30 ", newDate)
    }else{
      newDate = setMinutes(date, 0);
      console.log("less than 30 ", newDate)
    }
    return newDate;
  }
}
