import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DASHBOARD_CONSTANTS } from '../dashboard.constants';

@Component({
  selector: 'calendar-header-component',
  templateUrl: 'calendar-header.component.html',
  styleUrls: [ './calendar-header.component.css' ]
})
export class CalendarHeaderComponent {
  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  dashboardConstant = DASHBOARD_CONSTANTS;
  
}
