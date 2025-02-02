import express from "express";
import multer from 'multer'
import {addField, deleteField, updateField} from "../database/field-data-store";
import {Field} from "../models/Field";
import FieldModel from "../models/Field-model";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("fieldImage"), async (req, res) => {
    const field:Field = {
        fieldName: req.body.fieldName,
        location: req.body.location,
        extentSize: Number(req.body.extentSize),
        fieldImage: req.file? req.file.filename : ""
    };
    try{
        const addedField = await addField(field);
        res.json(addedField);
    }catch(err){
        console.log("Error Saving field",err);
        res.status(400).send("Error adding field");
    }
})

router.put("/update/:fieldName", upload.single("fieldImage"), async (req,res) => {
    const fieldName:string = req.params.fieldName;

    const existingField = await FieldModel.findOne({fieldName:fieldName});
    if(!existingField){
        return res.status(400).json({message: "Field not found"});
    }
    const field:Field = {
        fieldName: req.body.fieldName || existingField.fieldName,

        location: req.body.location || existingField.location,
        extentSize: req.body.extentSize ? Number(req.body.extentSize) : existingField.extentSize,
        fieldImage: req.file? req.file.filename : existingField.fieldImage
    }
    try {
        const updatedField = await updateField(fieldName,field);
        res.json(updatedField);
    }catch(err){
        console.log("Error Updating field",err);
        res.status(400).send("Error updating field");
    }
})

router.delete("/delete/:fieldName",async (req,res)=>{

}
export default router;