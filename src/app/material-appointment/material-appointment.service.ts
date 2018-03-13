import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CoreServices } from '../core.service';
import { MATERIAL_APPOINTMENT_CONSTANTS } from './material-appointment.constants';
import { PatientModel } from '../models/patient.model';

@Injectable()
export class MaterialAppointmentService{

    API_URL: string;

    constructor(private coreServices: CoreServices){
        this.API_URL = environment.API_URL
    }

    createPatient(data: PatientModel): Observable<PatientModel>{
        return this.coreServices.post(this.API_URL + MATERIAL_APPOINTMENT_CONSTANTS.CREATE_PATIENT, data, {});
    }

    updatePatient(data: PatientModel){
        return this.coreServices.put(this.API_URL + MATERIAL_APPOINTMENT_CONSTANTS.UPDATE_PATIENT, data, {});
    }

    getAllPatient(): Observable<PatientModel[]>{   
        return this.coreServices.get(this.API_URL + MATERIAL_APPOINTMENT_CONSTANTS.FETCH_ALL_PATIENT, {});
    }

    getPatientById(id: string): Observable<PatientModel>{
        return this.coreServices.get(this.API_URL + MATERIAL_APPOINTMENT_CONSTANTS.FETCH_PATIENT_BY_ID + id, {})
    }

    searchPatientByNameOrNumber(name: string, number: number): Observable<PatientModel[]>{   
        return this.coreServices.get(this.API_URL + MATERIAL_APPOINTMENT_CONSTANTS.SEARCH_PATIENTS, {});
    }
}