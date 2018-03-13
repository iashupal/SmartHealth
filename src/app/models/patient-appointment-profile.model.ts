import { PatientHistory } from "./patient-history.model";

export class PatientAppointmentProfile {
    id: number;
    firstName: string;
    secondName: string;
    lastName: string;
    gender: string;
    age: string;
    doctorName: string;
    uhid: string;
    time: string;
    durationMinute: number;
    patientDetails: string[];
    viewHistory: PatientHistory[];
    avatarURL: string;
    mobileNumber: number;
    emailId: string;
    dialingCode: string;
}