import { BaseRequestModel } from "./auth.model";

export class NewPatientModel implements BaseRequestModel {
    id: number;
    current_time: string;
    name: string;
    email: string;
    mobile: string;
    gender: string;
    dob: string;
    blood_group: string;
    occupation: string;
    uhid: string;
    emergency_contact_number: string;
    emergency_contact_name: string;
    smarthealth_id: true;
}