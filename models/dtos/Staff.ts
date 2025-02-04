import {Gender} from "../enums/Gender";

export class Staff {
    name: string;
    designation: string;
    gender: Gender;
    joinedDate: Date;
    dob: Date;
    address: string;
    contact: string;
    email: string;
    fieldName: string;

    constructor(name: string, designation: string, gender: Gender,joinedDate: Date, dob: Date, address: string, contact: string, email: string, fieldName: string) {
        this.name = name;
        this.designation = designation;
        this.gender = gender;
        this.joinedDate = joinedDate;
        this.dob = dob;
        this.address = address;
        this.contact = contact;
        this.email = email;
        this.fieldName = fieldName;
    }
}