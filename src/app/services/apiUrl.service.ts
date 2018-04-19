import { Injectable } from '@angular/core';
import { SERVER_BASE_URL, SERVER_API_URL } from '../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ApiUrlService {

    constructor(private activatedRoute: ActivatedRoute, private location: Location) {}

    public get_organisation_users_login_Url(): string {
        // console.log(`${SERVER_API_URL}`);
        if (window.location.href.includes('localhost')) {
            return 'http://staging.smarthealth.ai/v1/organisation-users/login';
        } else {
            return '/v1/organisation-users/login';
        }
    }

    public get_organisation_users_logout_Url(): string {
        // console.log(`${SERVER_API_URL}`);
        if (window.location.href.includes('localhost')) {
            return 'http://staging.smarthealth.ai/v1/organisation-users/logout';
        } else {
            return '/v1/organisation-users/logout';
        }
    }

    public get_organisation_users_profile_Url(): string {
        if (window.location.href.includes('localhost')) {
            return 'http://staging.smarthealth.ai/v1/organisation-users/profile';
        } else {
            return '/v1/organisation-users/profile';
        }
    }

    public get_organisation_users_branches_Url(): string {
        if (window.location.href.includes('localhost')) {
            return 'http://staging.smarthealth.ai/v1/organisation-users/branches';
        } else {
            return '/v1/organisation-users/branches';
        }
    }

    public get_organisation_user_logs_url(): string {
        if (window.location.href.includes('localhost')) {
            return 'http://staging.smarthealth.ai/v1/organisation-user-logs';
        } else {
            return '/v1/organisation-user-logs';
        }
    }

    public get_CalendarHeaderCount_Url(branch_id, date_type): string {
        if (window.location.href.includes('localhost')) {
            return `http://staging.smarthealth.ai/v1/appointments/count/${branch_id}/${date_type}`;
        } else {
            return `/v1/appointments/count/${branch_id}/${date_type}`;
        }
    }

    public Get_Calendar_Appointments_Url(branch_id, date_type, appointment_type) {
        if (window.location.href.includes('localhost')) {
            return `http://staging.smarthealth.ai/v1/appointments/${branch_id}/${date_type}/${appointment_type}`;
        } else {
            return `/v1/appointments/${branch_id}/${date_type}/${appointment_type}`;
        }
    }

    public create_patient_url(): string {
        if (window.location.href.includes('localhost')) {
            return 'http://staging.smarthealth.ai/v1/organisation-patients';
        } else {
            return '/v1/organisation-patients';
        }
    }

    public get_static_suggesstions_url(): string {
        if (window.location.href.includes('localhost')) {
            return 'http://staging.smarthealth.ai/v1/medical-record-document-section-suggestions';
        } else {
            return '/v1/medical-record-document-section-suggestions';
        }
    }

    public get_dynamic_suggesstions_url(section_sct): string {
        if (window.location.href.includes('localhost')) {
            return 'http://staging.smarthealth.ai/v1/section-autosuggestions/'+section_sct;
        } else {
            return '/v1/section-autosuggestions/'+section_sct;
        }
    }

    public get_search_patients_url(branch_id): string {
        if (window.location.href.includes('localhost')) {
            return `http://staging.smarthealth.ai/v1/organisation-patients/${branch_id}/search`;
        } else {
            return `/v1/organisation-patients/${branch_id}/search`;
        }
    }

    public get_search_doctors_url(branch_id): string {
        if (window.location.href.includes('localhost')) {
            return `http://staging.smarthealth.ai/v1/organisation-users/${branch_id}/search`;
        } else {
            return `/v1/organisation-users/${branch_id}/search`;
        }
    }

    public get_search_department_url(branch_id): string {
        if (window.location.href.includes('localhost')) {
            return `http://staging.smarthealth.ai/v1/departments/${branch_id}/search`;
        } else {
            return `/v1/departments/${branch_id}/search`;
        }
    }

    public create_appointment_url(): string {
        if (window.location.href.includes('localhost')) {
            return 'http://staging.smarthealth.ai/v1/appointments';
        } else {
            return '/v1/appointments';
        }
    }

}
