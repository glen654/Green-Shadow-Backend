import {PrismaClient} from "@prisma/client";
import {Equipment} from "../models/dtos/Equipment";

const prisma = new PrismaClient();

export async function addEquipment(e:Equipment){
    try {
        const newEquipment = await prisma.equipment.create({
            data:{
                equipName: e.equipName,
                equipType: e.equipType,
                status: e.status,
                staffMember: e.staffMember,
                fieldName: e.fieldName,
            }

        })
        console.log("Equipment added successfully",newEquipment);
        return newEquipment;
    }catch (err){
        console.log("Error adding new equipment",err);
    }
}

export async function updateEquipment(equipName:string,e:Equipment){
    try{
        const existingEquipment = await prisma.equipment.findUnique({
            where: {equipName: equipName}
        });

        if(!existingEquipment){
            console.log("Equipment not found");
            return null;
        }
        const updatedEquipment = await prisma.equipment.update({
            where: {equipName: equipName},
            data: {
                equipName: e.equipName || existingEquipment.equipName,
                equipType: e.equipType || existingEquipment.equipType,
                status: e.status || existingEquipment.status,
                staffMember: e.staffMember || existingEquipment.staffMember,
                fieldName: e.fieldName || existingEquipment.fieldName
            },
        })
        console.log("Equipment updated",updatedEquipment);
        return updatedEquipment;
    }catch (error){
        console.log("Error updating equipment",error);
    }
}

export async function deleteEquipment(equipName:string){
    try{
        const existingEquipment = await prisma.equipment.findUnique({
            where:{equipName: equipName}
        });

        if(!existingEquipment){
            console.log("Equipment not found");
            return null;
        }
        await prisma.equipment.delete({
            where: {equipName: equipName}
        });
        console.log("Equipment deleted",equipName);
        return equipName;
    }catch (error){
        console.log("Error deleting equipment",error);
    }
}

export async function getAllEquipment(){
    try{
        return prisma.equipment.findMany();
    }catch (error){
        console.log("Error getting equipments data from the DB",error);
    }
}