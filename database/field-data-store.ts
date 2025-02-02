import {Field} from "../models/Field";
import FieldModel from "../models/Field-model";

export async function addField(f:Field) {
    try{
        const newField = await FieldModel.create({
            fieldName: f.fieldName,
            location: f.location,
            extentSize: f.extentSize,
            fieldImage: f.fieldImage,
        })
        console.log("Field Added", newField);
        return newField;
    }catch (err){
        console.log("Error adding field",err);
    }
}

export async function updateField(fieldName:string,f:Field) {
    try{
        const updatedField = await FieldModel.updateOne(
        {fieldName:fieldName},
            {
                location: f.location,
                extentSize: f.extentSize,
                fieldImage: f.fieldImage,
            }
        )
        console.log("Updated field",updatedField);
        return updatedField;
    }catch (error){
        console.log("Error updating field",error);
    }
}

export async function deleteField(fieldName:string) {
    try{
        await FieldModel.deleteOne(
            {fieldName:fieldName},
        )
        console.log("Deleted field",fieldName);
        return fieldName;
    }catch (error){
        console.log("Error deleting field",error);
    }
}

export async function getAllFields() {
    try{
        return FieldModel.find();
    }catch (error){
        console.log("Error getting field from the database",error);
    }
}