import {Vehicle} from "../models/dtos/Vehicle";
import VehicleModel from "../models/schemas/Vehicle-model";
import vehicleModel from "../models/schemas/Vehicle-model";

export async function addVehicle(v:Vehicle){
    try{
        const newVehicle = await VehicleModel.create({
            licensePlateNumber: v.licensePlateNumber,
            category: v.category,
            fuelType: v.fuelType,
            status: v.status,
            remarks: v.remarks,
            staffMember: v.staffMember,
        })
        console.log("Vehicle added successfully.",newVehicle);
        return newVehicle;
    }catch(err){
        console.log("Error adding new vehicle",err);
    }
}

export async function updateVehicle(licenseNumber:string,v:Vehicle){
    try{
        const existingVehicle = await VehicleModel.findOne({licensePlateNumber: licenseNumber});

        if(!existingVehicle){
            console.log("Vehicle not found");
            return null;
        }
        const updatedVehicle = await vehicleModel.findOneAndUpdate(
            {licensePlateNumber: licenseNumber},
            {
                licensePlateNumber: v.licensePlateNumber || existingVehicle.licensePlateNumber,
                category: v.category || existingVehicle.category,
                fuelType: v.fuelType || existingVehicle.fuelType,
                status: v.status || existingVehicle.status,
                remarks: v.remarks || existingVehicle.remarks,
                staffMember: v.staffMember || existingVehicle.staffMember
            }
        )
        console.log("Vehicle updated",updatedVehicle);
        return updatedVehicle;
    }catch (error){
        console.log("Error updating vehicle",error);
    }
}

export async function deleteVehicle(licenseNumber:string){
    try{
        const existingVehicle = await VehicleModel.findOne({licensePlateNumber: licenseNumber});

        if(!existingVehicle){
            console.log("Vehicle not found");
            return null;
        }
        await VehicleModel.deleteOne(
            {licensePlateNumber: licenseNumber}
        );
        console.log("Vehicle deleted",licenseNumber);
        return licenseNumber;
    }catch (error){
        console.log("Error deleting vehicle",error);
    }
}

export async function getAllVehicles(){
    try{
        return VehicleModel.find();
    }catch (error){
        console.log("Error getting vehicles data from the DB",error);
    }
}