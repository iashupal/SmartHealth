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
}
