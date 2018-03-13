import { PatientModel } from '../../models/patient.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MaterialAppointmentService } from '../material-appointment.service';

@Component({
  selector: 'app-existing-patient',
  templateUrl: './existing-patient.component.html',
  styleUrls: ['./existing-patient.component.scss']
})
export class ExistingPatientComponent implements OnInit {

  displayedColumns = ['firstName', 'gender', 'age', 'mobileNumber'];
  dataSource: MatTableDataSource<PatientModel> = new MatTableDataSource<PatientModel>([]);
  searchPatientForm: FormGroup;
  patients : any[] = []

  constructor(private appointmentService : MaterialAppointmentService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.searchPatientForm = new FormGroup({
      name: new FormControl(null),
      mobileNumber: new FormControl(null)
    })
  }

  searchPatients(){
    let values = this.searchPatientForm.value;
    console.log("values are ", values)
    this.appointmentService.searchPatientByNameOrNumber(values.name, values.mobileNumber)
    .subscribe(
      (data: PatientModel[]) => {
        console.log("Patients are ", data)
        this.dataSource = new MatTableDataSource<PatientModel>(data);
      },
      (error) => {
        alert("Error boss. Fix it or loose the customer")
        console.log("Error boss. Fix it or loose the customer")
      }
    )    
  }

  onSelectPatient(patient){
    console.log("Inside onSelectPatient ", patient)
  }
}

