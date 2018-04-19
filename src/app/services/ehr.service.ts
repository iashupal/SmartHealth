import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CoreServices } from '../core.service';
import { PatientModel } from '../models/patient.model';
import { ApiUrlService } from '../services/apiUrl.service';
import { UtilService } from '../services/util.service';
import { BaseRequestModel } from '../models/auth.model';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable()
export class EHRService{

   
    constructor(private httpClient: HttpClient, private utilService: UtilService,
        private apiUrlService: ApiUrlService, private authService: AuthService) {
    }

    public getStaticSuggestions(sct): Observable<any> {
        const currentTime = Date.now();
        const signature = this.utilService.get_HMAC_SHA256(null, currentTime);
        this.authService.setHeaderValues('current_time', signature);
        const requestOptions = {
            params: new HttpParams().set('current_time', currentTime.toString()).append("section_sct", sct)
        };
        console.log("Inside create new patient")
        return this.httpClient.get<any>(this.apiUrlService.get_static_suggesstions_url(), requestOptions);
    }

    public getDynamicSuggestions(query_term,sct): Observable<any> {
        const currentTime = Date.now();
        const signature = this.utilService.get_HMAC_SHA256(null, currentTime);
        this.authService.setHeaderValues('current_time', signature);
        const requestOptions = {
            params: new HttpParams().set('current_time', currentTime.toString()).append("query_term", query_term)
        };
        console.log("Inside create new patient")
        return this.httpClient.get<any>(this.apiUrlService.get_dynamic_suggesstions_url(sct), requestOptions);
    }

}