import { DepartmentModel } from "./department.model";

export class DoctorModel {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    specialisation: string;
    qualification: string;
    mci_number: number;
    image: string;
    mobile: number;
    departments: DepartmentModel[]
}

