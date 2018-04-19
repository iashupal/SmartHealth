import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../models/patient.model';
import { BLOOD_GROUP_DATA } from '../../shared/reference-data/blood-group.constant';
import { OCCUPATION_DATA } from '../../shared/reference-data/occupation.constant';
import { COUNTRY_CODES_DATA } from '../../shared/reference-data/country-code.constant';
import { COUNTRY_DATA } from '../../shared/reference-data/country.constant';
import { GOV_ID_PROOF_DATA } from '../../shared/reference-data/gov-id-proofs.constant';
import { STATE_DATA } from '../../shared/reference-data/state.constant';
import { MaterialAppointmentService } from '../material-appointment.service';
import { FixAppointmentModalComponent } from '../fix-appointment-modal/fix-appointment-modal.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  patientRegistrationForm: FormGroup;

  bloodGroupData: any[] = BLOOD_GROUP_DATA;
  occupationData: any[] = OCCUPATION_DATA;
  countryCodeData: any[] = COUNTRY_CODES_DATA;
  countryData: any[] = COUNTRY_DATA;
  govProofData: any[] = GOV_ID_PROOF_DATA;
  stateData: any[] = STATE_DATA;

  maxDate: Date  = new Date();

  fixAppointmentModalRef : MatDialogRef<FixAppointmentModalComponent>;

  is_walkin: any;

  constructor(private appointmentService: MaterialAppointmentService, public dialog: MatDialog, private route: ActivatedRoute) {
    this.createForm(new PatientModel())
    console.log(this.patientRegistrationForm)
   }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.is_walkin = params['typeId']
      }
    )
  }

  createForm(patientModel: PatientModel){
    this.patientRegistrationForm = new FormGroup({
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
    console.log(this.patientRegistrationForm)
    console.log(this.patientRegistrationForm.value)
    this.appointmentService.createNewPatient(this.patientRegistrationForm.value).subscribe(
      (data)=> {
        console.log("Patient is created")
      },
      (error)=> {
        console.log("Error while creating patient ", error)
      }
    )
  }

  openFixAppointmentModal() {
    this.fixAppointmentModalRef = this.dialog.open(FixAppointmentModalComponent, {
        height: '200px',
        width: '150px',
        data: {
          screen: "Screen 1"
        }
      });
  }
}
