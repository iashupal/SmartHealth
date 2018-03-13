import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { CoreHttpService } from './coreHttp.service';
import { UtilService } from './util.service';
import { ApiUrlService } from './apiUrl.service';
import { BaseRequestModel, LoginModel, LoginRequestModel, LoginResponseModel, UserProfileResponseModel,
    UserBranchResponseModel, OrganisationUserLogsReqModel, BranchInfo } from '../models/auth.model';

@Injectable()
export class AuthService {

    baseRequestModel: BaseRequestModel;
    loginRequestModel: LoginRequestModel;
    organisationUserLogsReqModel: OrganisationUserLogsReqModel;
    headers: HttpHeaders;
    xSignedValue: string;
    xSignatureValue: string;
    xCsrftokenValue: string;

    constructor(private httpClient: HttpClient, private coreHttpService: CoreHttpService, private utilService: UtilService,
        private apiUrlService: ApiUrlService) {
        this.loginRequestModel = {
            username: null,
            password: null,
            current_time: null
        };
        this.baseRequestModel = {
            current_time: null
        };
        this.organisationUserLogsReqModel = {
            current_time: null,
            event: null,
            branch_id: null
        };
    }

    private setHeaderValues(signed: string, signature: string) {
        this.xSignedValue = signed;
        this.xSignatureValue = signature;
    }

    public Organisation_users_login(loginModel: LoginModel): Observable<LoginResponseModel> {
        const currentTime = Date.now();
        const signature = this.utilService.get_HMAC_SHA256(loginModel, currentTime);
        this.loginRequestModel.username = loginModel.username;
        this.loginRequestModel.password = loginModel.password;
        this.loginRequestModel.current_time = currentTime.toString();
        this.setHeaderValues('username,password,current_time', signature);
        return this.httpClient.post<LoginResponseModel>(this.apiUrlService.get_organisation_users_login_Url(), this.loginRequestModel);
    }

    public Get_organisation_users_pofile(): Observable<UserProfileResponseModel> {
        const currentTime = Date.now();
        const signature = this.utilService.get_HMAC_SHA256(null, currentTime);
        this.baseRequestModel.current_time = currentTime.toString();
        this.setHeaderValues('current_time', signature);
        const requestOptions = {
            params: new HttpParams().set('current_time', currentTime.toString())
        };
        return this.httpClient.get<UserProfileResponseModel>(this.apiUrlService.get_organisation_users_profile_Url(), requestOptions);
    }

    public Get_organisation_users_branches(): Observable<UserBranchResponseModel> {
        const currentTime = Date.now();
        const signature = this.utilService.get_HMAC_SHA256(null, currentTime);
        this.baseRequestModel.current_time = currentTime.toString();
        this.setHeaderValues('current_time', signature);
        const requestOptions = {
            params: new HttpParams().set('current_time', currentTime.toString())
        };
        return this.httpClient.get<UserBranchResponseModel>(this.apiUrlService.get_organisation_users_branches_Url(), requestOptions);
    }

    public post_organisation_user_logs(branchID: number) {
        const currentTime = Date.now();
        this.organisationUserLogsReqModel.branch_id = branchID.toString();
        this.organisationUserLogsReqModel.current_time = currentTime.toString();
        this.organisationUserLogsReqModel.event = 'LOGIN';
        const signature = this.utilService.get_HMAC_SHA256(null, currentTime);
        this.setHeaderValues('current_time', signature);
        return this.httpClient.post(this.apiUrlService.get_organisation_user_logs_url(), this.organisationUserLogsReqModel);

    }
}
