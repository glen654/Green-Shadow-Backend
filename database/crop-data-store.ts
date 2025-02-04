import {Crop} from "../models/Crop";
import CropModel from "../models/Crop-model";
import path from "path";
import fs from 'fs'

export async function addCrop(c:Crop){
    try{
        const newCrop = await CropModel.create({
            commonName: c.commonName,
            scientificName: c.scientificName,
            category: c.category,
            cropImage: c.cropImage,
            fieldName: c.fieldName,
        })
        console.log("Crop added", newCrop);
        return newCrop;
    }catch(err){
        console.log("Error adding crop",err);
    }
}

export async function updateCrop(commonName: string,c:Crop){
    try{
        const existingCrop = await CropModel.findOne({commonName: commonName});
        if(!existingCrop){
            console.log("Crop not found");
            return null;
        }

        const updatedCrop = await CropModel.findOneAndUpdate(
            {commonName: commonName},
            {
                commonName: c.commonName || existingCrop.commonName,
                scientificName: c.scientificName || existingCrop.scientificName,
                category: c.category || existingCrop.category,
                cropImage: c.cropImage || existingCrop.cropImage,
                fieldName: c.fieldName || existingCrop.fieldName
            }
        )
        console.log("Crop updated", updatedCrop);
        return updatedCrop;
    }catch(err){
        console.log("Error updating crop",err);
    }
}

export async function deleteCrop(commonName:string){
    try{
        const existingCrop = await CropModel.findOne({commonName: commonName});
        if(!existingCrop) {
            console.log("Crop not found");
            return null;
        }
        if(existingCrop.cropImage){
            const imagePath = path.join("uploads",existingCrop.cropImage);
            fs.unlink(imagePath, (err)=> {
                if(err){
                    console.log("Error deleting image file",err);
                }else {
                    console.log("Deleted image file",imagePath);
                }
            });
        }
        await CropModel.deleteOne(
            {commonName: commonName},
        )
        console.log("Delete Crop",commonName);
        return commonName;
    }catch(err){
        console.log("Error deleting crop",err);
    }
}

export async function getAllCrops(){
    try{
        return CropModel.find();
    }catch (error){
        console.log("Error getting crop data from the database", error);
    }
}