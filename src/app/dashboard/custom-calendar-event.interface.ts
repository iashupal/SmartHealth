import { CalendarEvent } from "angular-calendar";

export interface CustomCalendarEvent extends CalendarEvent {
    id: string;
    patientName: string;
    gender: string;
    age: number;
    patientStatus: string;
    appointmentStatus: string;
    appointmentDate: Date;
  }