import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CoreServices } from '../core.service';
import { MATERIAL_APPOINTMENT_CONSTANTS } from './material-appointment.constants';
import { PatientModel } from '../models/patient.model';
import { ApiUrlService } from '../services/apiUrl.service';
import { UtilService } from '../services/util.service';
import { BaseRequestModel } from '../models/auth.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AppointmentModel } from '../models/appointment.model';

@Injectable()
export class MaterialAppointmentService{

    constructor(private httpClient: HttpClient, private utilService: UtilService,
        private apiUrlService: ApiUrlService, private authService: AuthService) {
    }

    public createNewPatient(patientModel: PatientModel): Observable<PatientModel> {
        const currentTime = Date.now();
        const signature = this.utilService.get_HMAC_SHA256(null, currentTime);
        this.authService.setHeaderValues('current_time', signature);
        patientModel.current_time = currentTime.toString();
        console.log("Inside create new patient")
        return this.httpClient.post<PatientModel>(this.apiUrlService.create_patient_url(), patientModel);
    }

    searchPatientByNameOrNumber(query: string, queryType: string, branchId: any): Observable<any[]>{   
        const currentTime = Date.now();
        const signature = this.utilService.get_HMAC_SHA256(null, currentTime);
        this.authService.setHeaderValues('current_time', signature);
        const requestOptions = {
            params: new HttpParams().set('current_time', currentTime.toString())
            .append("query_term", query)
            .append("query_type", queryType)
            .append("page", ''+1)
            .append("limit", ''+10)
        };
        console.log("Inside create new patient")
        return this.httpClient.get<any>(this.apiUrlService.get_search_patients_url(branchId), requestOptions);
    }

    searchDoctorsByQuery(query: string, queryType: string, branchId: any, deptId: any): Observable<any[]>{   
        const currentTime = Date.now();
        const signature = this.utilService.get_HMAC_SHA256(null, currentTime);
        this.authService.setHeaderValues('current_time', signature);
        const requestOptions = {
            params: new HttpParams().set('current_time', currentTime.toString())
            .append("query_term", query)
            .append("query_type", queryType)
            .append("department_id", deptId)
            .append("page", ''+1)
            .append("limit", ''+10)
        };
        console.log("Inside create new patient")
        return this.httpClient.get<any>(this.apiUrlService.get_search_doctors_url(branchId), requestOptions);
    }

    searchDepartmentsByQuery(query: string, branchId: any): Observable<any[]>{   
        const currentTime = Date.now();
        const signature = this.utilService.get_HMAC_SHA256(null, currentTime);
        this.authService.setHeaderValues('current_time', signature);
        const requestOptions = {
            params: new HttpParams()
            .set('current_time', currentTime.toString())
            .append("query_term", query)
            .append("page", ''+1)
            .append("limit", ''+10)
        };
        console.log("Inside create new patient")
        return this.httpClient.get<any>(this.apiUrlService.get_search_department_url(branchId), requestOptions);
    }

    public createNewAppointment(appointmentModel: AppointmentModel): Observable<any> {
        const currentTime = Date.now();
        const signature = this.utilService.get_HMAC_SHA256(null, currentTime);
        this.authService.setHeaderValues('current_time', signature);
        appointmentModel.current_time = currentTime.toString();
        console.log("Inside create new patient")
        return this.httpClient.post<any>(this.apiUrlService.create_appointment_url(), appointmentModel);
    }


    
}