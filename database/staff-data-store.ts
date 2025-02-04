import {Staff} from "../models/Staff";
import StaffModel from "../models/Staff-model";

export async function addStaff(s:Staff){
    try{
        const newStaffMember = await StaffModel.create({
            name: s.name,
            designation: s.designation,
            gender: s.gender,
            joinedDate: s.joinedDate,
            dob: s.dob,
            address: s.address,
            contact: s.contact,
            email: s.email,
            fieldName: s.fieldName,
        })
        console.log("Staff member added",newStaffMember);
        return newStaffMember;
    }catch(err){
        console.log("Error adding staff member",err);
    }
}

export async function updateStaff(name:string,s:Staff){
    try{
        const existingStaffMember = await StaffModel.findOne({name: name});

        if(!existingStaffMember){
            console.log("Staff not found");
            return null;
        }
        const updatedStaffMember = await StaffModel.findOneAndUpdate(
            {name: name},
            {
                name: s.name || existingStaffMember.name,
                designation: s.designation || existingStaffMember.designation,
                gender: s.gender || existingStaffMember.gender,
                joinedDate: s.joinedDate || existingStaffMember.joinedDate,
                dob: s.dob || existingStaffMember.dob,
                address: s.address || existingStaffMember.address,
                contact: s.contact || existingStaffMember.contact,
                email: s.email || existingStaffMember.email,
                fieldName: s.fieldName || existingStaffMember.fieldName
            }
        )
        console.log("Updated Staff Member",updatedStaffMember);
        return updatedStaffMember;
    }catch(err){
        console.log("Error updating staff member",err);
    }
}

export async function deleteStaff(name:string){
    try{
        const existingStaffMember = await StaffModel.findOne({name: name});

        if(!existingStaffMember){
            console.log("Staff not found");
            return null;
        }

        await StaffModel.deleteOne(
            {name: name}
        );
        console.log("Deleted staff member",name);
        return name;
    }catch (err){
        console.log("Error deleting staff member",err);
    }
}

export async function getAllStaff(){
    try{
        return StaffModel.find();
    }catch (error){
        console.log("Error getting staff details from the database",error);
    }
}

export async function getAllStaffNames(){
    try {
        const staffNames = await StaffModel.find({}, "name");
        return staffNames.map(staff => staff.name);
    }catch (error){
        console.log("Error getting staff names",error);
    }
}