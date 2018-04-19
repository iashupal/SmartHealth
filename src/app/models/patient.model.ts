import { BaseRequestModel } from "./auth.model";

export class PatientModel implements BaseRequestModel {
    current_time: string;
    id: number;
    firstName: string;
    secondName: string;
    lastName: string;
    gender: string;
    dob: string;
    bloodGroup: string;
    dialingCode: string;
    mobileNumber: number;
    address1: string;
    pincode: number;
    stateId: number;
    countryId: number;
    occupation: string;
    govIdProof: string;
    govIdNumber: string;
    emergencyContactNumber: number;
    age: number;
    patientStatus: string;
    // id: number;
    // current_time: string;
    // name: string;
    // email: string;
    // mobile: string;
    // gender: string;
    // dob: string;
    // blood_group: string;
    // occupation: string;
    // uhid: string;
    // emergency_contact_number: string;
    // emergency_contact_name: string;
    // is_vip: true;
    // organisation_patient_id_proofs: [{
    //     id_proof_type: string;
    //     id_proof_value: string
    //   }
    // ];
    // branch_id: 0
}