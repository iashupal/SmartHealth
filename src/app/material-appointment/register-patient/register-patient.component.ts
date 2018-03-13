import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../models/patient.model';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  patientRegistrationForm: FormGroup;

  constructor() {
    this.createForm(new PatientModel())
    console.log(this.patientRegistrationForm)
   }

  ngOnInit() {
    
  }

  createForm(patientModel: PatientModel){
    this.patientRegistrationForm = new FormGroup({
      id: new FormControl(patientModel.id),
      firstName: new FormControl(patientModel.firstName),
      secondName: new FormControl(patientModel.secondName),
      lastName: new FormControl(patientModel.lastName),
      gender: new FormControl(patientModel.gender),
      dob: new FormControl(patientModel.dob),
      bloodGroup: new FormControl(patientModel.bloodGroup),
      dialingCode: new FormControl(patientModel.dialingCode),
      mobileNumber: new FormControl(patientModel.mobileNumber),
      address1: new FormControl(patientModel.address1),
      pincode: new FormControl(patientModel.pincode),
      stateId: new FormControl(patientModel.stateId),
      countryId: new FormControl(patientModel.countryId),
      occupation: new FormControl(patientModel.occupation),
      govIdProof: new FormControl(patientModel.govIdProof),
      govIdNumber: new FormControl(patientModel.govIdNumber),
      emergencyContactNumber: new FormControl(patientModel.emergencyContactNumber),
    })
  }

  createPatient(){
    console.log(this.patientRegistrationForm.value)
  }
}
