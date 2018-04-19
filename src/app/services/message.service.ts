import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {

    sub_LocalStorage_Update = new Subject();

    Get_LocalStorage_Observable(): Observable<any> {
        return this.sub_LocalStorage_Update.asObservable();
    }

    Update_LocalStorage_Subject() {
        this.sub_LocalStorage_Update.next();
    }
}
