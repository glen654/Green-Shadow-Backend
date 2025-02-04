import {Equipment} from "../models/dtos/Equipment";
import EquipmentModel from "../models/schemas/Equipment-model";

export async function addEquipment(e:Equipment){
    try {
        const newEquipment = await EquipmentModel.create({
            equipName: e.equipName,
            equipType: e.equipType,
            status: e.status,
            staffMember: e.staffMember,
            fieldName: e.fieldName,
        })
        console.log("Equipment added successfully",newEquipment);
        return newEquipment;
    }catch (err){
        console.log("Error adding new equipment",err);
    }
}

export async function updateEquipment(equipName:string,e:Equipment){
    try{
        const existingEquipment = await EquipmentModel.findOne({equipName: equipName});

        if(!existingEquipment){
            console.log("Equipment not found");
            return null;
        }
        const updatedEquipment = await EquipmentModel.findOneAndUpdate(
            {equipName: equipName},
            {
                equipName: e.equipName || existingEquipment.equipName,
                equipType: e.equipType || existingEquipment.equipType,
                status: e.status || existingEquipment.status,
                staffMember: e.staffMember || existingEquipment.staffMember,
                fieldName: e.fieldName || existingEquipment.fieldName
            }
        )
        console.log("Equipment updated",updatedEquipment);
        return updatedEquipment;
    }catch (error){
        console.log("Error updating equipment",error);
    }
}

export async function deleteEquipment(equipName:string){
    try{
        const existingEquipment = await EquipmentModel.findOne({equipName: equipName});

        if(!existingEquipment){
            console.log("Equipment not found");
            return null;
        }
        await EquipmentModel.deleteOne(
            {equipName: equipName}
        );
        console.log("Equipment deleted",equipName);
        return equipName;
    }catch (error){
        console.log("Error deleting equipment",error);
    }
}

export async function getAllEquipment(){
    try{
        return EquipmentModel.find();
    }catch (error){
        console.log("Error getting equipments data from the DB",error);
    }
}