export interface AutocompleteResultModel {
    id: string;
    text: string;
}

export interface BaseRequestModel {
    current_time: string;
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
    branch_id: string;
}
