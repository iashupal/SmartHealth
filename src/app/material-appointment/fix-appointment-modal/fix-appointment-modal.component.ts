import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-fix-appointment-modal',
  templateUrl: './fix-appointment-modal.component.html',
  styleUrls: ['./fix-appointment-modal.component.css']
})
export class FixAppointmentModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
