import path from "path";
import {Field} from "../models/dtos/Field";
import fs from 'fs'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addField(f:Field) {
    try{
        const newField = await prisma.field.create({
            data:{
                fieldName: f.fieldName,
                location: f.location,
                extentSize: f.extentSize,
                fieldImage: f.fieldImage,
            }
        })
        console.log("Field Added", newField);
        return newField;
    }catch (err){
        console.log("Error adding field",err);
    }
}

export async function updateField(fieldName:string,f:Field) {
    try{
        const existingField = await prisma.field.findUnique({
             where:{fieldName: fieldName}
        });

        if(!existingField) {
            console.log("Field not found");
            return null;
        }
        const updatedField = await prisma.field.update({
            where: {fieldName: fieldName},
            data: {
                fieldName: f.fieldName || existingField.fieldName,
                location: f.location || existingField.location,
                extentSize: f.extentSize || existingField.extentSize,
                fieldImage: f.fieldImage || existingField.fieldImage
            },
        })
        console.log("Updated field",updatedField);
        return updatedField;
    }catch (error){
        console.log("Error updating field",error);
    }
}

export async function deleteField(fieldName:string) {
    try{
        const existingField = await prisma.field.findUnique({
            where:{fieldName: fieldName}
        });
        if(!existingField) {
            console.log("Field not found");
            return null;
        }

        if(existingField.fieldImage){
            const imagePath = path.join("uploads", existingField.fieldImage);
            fs.unlink(imagePath, (err) => {
                if(err){
                    console.log("Error deleting image file",err);
                }else{
                    console.log("Deleted field",imagePath);
                }
            });
        }
        await prisma.field.delete({
            where: {fieldName: fieldName},
        })
        console.log("Deleted field",fieldName);
        return fieldName;
    }catch (error){
        console.log("Error deleting field",error);
    }
}

export async function getAllFields() {
    try{
        return prisma.field.findMany();
    }catch (error){
        console.log("Error getting field from the database",error);
    }
}

export async function getAllFieldNames(){
    try {
        const fieldNames = await prisma.field.findMany({
            select: {
                fieldName: true
            }
        });
        return fieldNames.map(field => field.fieldName);
    }catch (error){
        console.log("Error getting field names",error);
    }
}