export interface AutocompleteResultModel {
    id: string;
    text: string;
}

export interface BaseRequestModel {
    current_time: string;
}

export interface BasePaginatedRequestModel {
    page: any;
    limit: any;
}

export class CommonPaginatedResponseModel<T> {
    page_count: number;
    total_count: number;
    page_results: T[];
}

export interface LoginModel {
    username: string;
    password: string;
}

export interface LoginResponseModel {
    url: string;
}

export interface LoginRequestModel extends BaseRequestModel, LoginModel {
}

export interface UserProfileResponseModel {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    specialisation: string;
    qualification: string;
    mci_number: number;
    image: string;
    mobile: string;
}

export interface UserBranchResponseModel {
    page_count: number;
    page_results: BranchInfo[];
    total_count: number;
}

export interface BranchInfo {
    id: number;
    name: string;
    logo: string;
    contact_number: string;
    contact_email: string;
    address: string;
    pincode: string;
    branch_type: string;
    locality: Locality;
    city: City;
    state: State;
    country: Country;
}

export interface Locality {
    id: number;
    name: string;
}

export interface City {
    id: number;
    name: string;
}

export interface State {
    id: number;
    name: string;
}

export interface Country {
    id: number;
    name: string;
}

export interface OrganisationUserLogsReqModel extends BaseRequestModel {
    event: string;
    branch_id: number;
}

export class LogoutReqModel implements BaseRequestModel {
    current_time: string;
    branch_id: any;
}

export class LogoutResModel {
    url: string;
}


////////////// CALENDAR MODELS ///////////////////////////////////////

export class CalendarHeaderCountResModel {
    ALL: number;
    PENDING: number;
    CHECKED_IN: number;
    CHECKED_OUT: number;
    CANCELLED: number;
}

export class CalendarHeaderCountReqModel implements BaseRequestModel {
    current_time: string;
}

export class CalendarAppointmentListReqModel implements BaseRequestModel, BasePaginatedRequestModel {
    current_time: string;
    page: any;
    limit: any;
}

export class OrganisationPatientInfo {
    id: number;
    name: string;
    email: string;
    mobile: string;
    gender: string;
    dob: string;
    blood_group: string;
    occupation: string;
    uhid: any;
    smarthealth_id: any;
}

export class CalendarAppointmentDetail {
    scheduled_time: string;
    is_walkin: boolean;
    is_rescheduled: boolean;
    status: string;
    organisation_patient: OrganisationPatientInfo;
    id: number;
    visit_id: any;
    medical_record_document_id: any;
    appointment_type: string;
}

export class CalendarAppointmentListResModel implements CommonPaginatedResponseModel<CalendarAppointmentDetail> {
    page_count: number;
    total_count: number;
    page_results: CalendarAppointmentDetail[];
}
