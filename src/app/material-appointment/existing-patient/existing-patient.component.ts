import { NewPatientModel } from '../../models/new-patient.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatAutocompleteSelectedEvent } from '@angular/material';
import { MaterialAppointmentService } from '../material-appointment.service';
import { MATERIAL_APPOINTMENT_CONSTANTS } from '../material-appointment.constants';
import { DepartmentModel } from '../../models/department.model';
import { DoctorModel } from '../../models/doctor.model';
import { AppointmentModel } from '../../models/appointment.model';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-existing-patient',
  templateUrl: './existing-patient.component.html',
  styleUrls: ['./existing-patient.component.scss']
})
export class ExistingPatientComponent implements OnInit {

  //table data
  patients : any[] = []
  displayedColumns = ['name', 'gender', 'dob', 'mobile'];
  dataSource: MatTableDataSource<NewPatientModel> = new MatTableDataSource<NewPatientModel>([]);

  //selected patient from table
  selectedPatient: NewPatientModel;

  //Autocomplete array list
  doctorSuggestions: DoctorModel[] = [];
  departmentSuggestions: DepartmentModel[] = [];

  //name and number form control
  nameCtrl = new FormControl();
  numberCtrl = new FormControl();

  //doctor and department form control
  doctorControl = new FormControl();
  departmentControl = new FormControl();

  //appointment form
  appointmentForm: FormGroup;
  is_walkin: any;

  //time picker
  private exportTime = {hour: 7, minute: 15, meriden: 'PM', format: 12};
  public isOpen: boolean = false;

  toggleTimePicker(){
    this.isOpen = !this.isOpen;
  }

  public onRevert() {
    this.exportTime = {hour: 7, minute: 15, meriden: 'PM', format: 12};
    this.isOpen = false;
  }

  public onSubmit(time) {
    //moment([2010, 1, 14, 15, 25, 50, 125]); // February 14th, 3:25:50.125 PM
    let hours = time.hour;
    if(time.meriden == 'PM'){
      hours = hours + 12;
    }
    console.log(moment(hours+""+time.minute, "hmm").format("HH:mm"))
    let selectedTime = moment(hours+""+time.minute, "hmm").format("HH:mm");
    
    this.appointmentForm.controls['selectedTime'].setValue(selectedTime);
    console.log("selected time is ", time)
    this.isOpen =false;
  }

  constructor(private appointmentService : MaterialAppointmentService, private route: ActivatedRoute) {
    this.nameCtrl.valueChanges
    .subscribe(
      (query)=>{
        console.log("query is ", query)
        if(query == "" || query == null){return;}
        this.searchPatients(query, MATERIAL_APPOINTMENT_CONSTANTS.NAME)
      }
    )

    this.numberCtrl.valueChanges
    .subscribe(
      (query)=>{
        console.log("query is ", query)
        if(query == "" || query == null){return;}        
        this.searchPatients(query, MATERIAL_APPOINTMENT_CONSTANTS.MOBILE)        
      }
    )

    this.doctorControl.valueChanges
    .subscribe(
      (query)=>{
        console.log("query is ", query)
        if(query == "" || query == null){return;}        
        this.searchDoctors(query, MATERIAL_APPOINTMENT_CONSTANTS.DOCTOR_NAME)          
      }
    )

    this.departmentControl.valueChanges
    .subscribe(
      (query)=>{
        console.log("query is ", query)
        if(query == "" || query == null){
          return;
        }        
        this.searchDepartments(query, MATERIAL_APPOINTMENT_CONSTANTS.DOCTOR_NAME)               
      }
    )
  }

  ngOnInit() {
    this.createAppointmentForm()

    this.route.params.subscribe(
      (params: Params) => {
        this.is_walkin = params['typeId']
      }
    )
  }

  createAppointmentForm(){
    this.appointmentForm = new FormGroup({
      selectedDate: new FormControl(null),
      selectedTime: new FormControl(null),
      selectedDoctor: new FormControl(null),
      selectedDepartment: new FormControl(null),
      visitId: new FormControl(null)
    })
    
  }

  searchPatients(query, searchType){
    this.appointmentService.searchPatientByNameOrNumber(query, searchType, 1)
    .subscribe(
      (data: any) => {
        console.log("Patients are ", JSON.stringify(data))
        this.dataSource = new MatTableDataSource<NewPatientModel>(data['page_results']);
      },
      (error) => {
        alert("Error boss. Fix it or loose the customer")
        console.log("Error boss. Fix it or loose the customer")
      }
    )    
  }

  searchDoctors(query, searchType){
    this.appointmentService.searchDoctorsByQuery(query, searchType, 1, "")
    .subscribe(
      (data: any) => {
        console.log("Patients are ", JSON.stringify(data))
        this.doctorSuggestions = data['page_results'];
      },
      (error) => {
        alert("Error boss. Fix it or loose the customer")
        console.log("Error boss. Fix it or loose the customer")
      }
    )    
  }

  searchDepartments(query, searchType){
    this.appointmentService.searchDepartmentsByQuery(query, 1)
    .subscribe(
      (data: any) => {
        console.log("Patients are ", JSON.stringify(data))
        this.departmentSuggestions = data['page_results'];
      },
      (error) => {
        alert("Error boss. Fix it or loose the customer")
        console.log("Error boss. Fix it or loose the customer")
      }
    )    
  }

  onSelectPatient(patient){
    console.log("Inside onSelectPatient ", patient)
    this.selectedPatient = patient;
    let appointModel = new AppointmentModel();
    //this.createAppointmentForm();
  }

  cancelAppointment(){
    this.selectedPatient = undefined;
    this.appointmentForm.reset();
  }

  createAppointment(){
    console.log("createAppointment called!")
    let formValue = this.appointmentForm.value;
    console.log('formValue is ', formValue)
    let appointmentModel = new AppointmentModel();

//2018-01-01T16:15:00Z

    console.log("formValue.selectedDate ", moment(formValue.selectedDate).format('YYYY-MM-DD'))
    console.log("formValue.selectedTime ", formValue.selectedTime+ ":00")

    let selectedDateTimeStamp = moment(formValue.selectedDate).format('YYYY-MM-DD') + "T" + formValue.selectedTime+ ":00Z";

    appointmentModel.scheduled_time = selectedDateTimeStamp;
    appointmentModel.user_id = formValue.selectedDoctor.id;
    appointmentModel.branch_id = 1;
    appointmentModel.organisation_patient_id = this.selectedPatient.id;
    appointmentModel.is_walkin = this.is_walkin;
    appointmentModel.visit_id = formValue.visitId;
    appointmentModel.department_id = formValue.selectedDepartment.id;

    console.log("appointmentModel is ", appointmentModel)

    this.appointmentService.createNewAppointment(this.appointmentForm.value).subscribe(
      (data)=> {
        console.log("Appointment is created")
      },
      (error)=> {
        console.log("Something is wrong ", error)
      }
    )
  }

  displayDoctorName(doctor?: DoctorModel): string | undefined {
    return doctor ? doctor.first_name + " " + doctor.last_name : undefined;
  }

  displayDepartmentName(dept?: DepartmentModel): string | undefined {
    return dept ? dept.name : undefined;
  }

  onSelectedDoctor(event: MatAutocompleteSelectedEvent): void {
    let value = event.option.value;
    this.appointmentForm.controls['selectedDoctor'].setValue(value);
    console.log("selectedDoctor is ", value);
  }

  onSelectedDepartment(event: MatAutocompleteSelectedEvent): void {
    let value = event.option.value;
    this.appointmentForm.controls['selectedDepartment'].setValue(value);
    console.log("selectedDepartment is ", value);
  }
}

