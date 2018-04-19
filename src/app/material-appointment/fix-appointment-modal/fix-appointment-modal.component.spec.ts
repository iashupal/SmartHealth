import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixAppointmentModalComponent } from './fix-appointment-modal.component';

describe('FixAppointmentModalComponent', () => {
  let component: FixAppointmentModalComponent;
  let fixture: ComponentFixture<FixAppointmentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixAppointmentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
