import express from "express";
import multer from 'multer'
import {addField, deleteField, getAllFieldNames, getAllFields, updateField} from "../database/field-data-store";
import {Field} from "../models/Field";

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

router.put("/update/:fieldName", upload.single("fieldImage"),async (req,res) => {
    const fieldName: string = req.params.fieldName;
    const field: Field = {
        fieldName: req.body.fieldName,
        location: req.body.location,
        extentSize: Number(req.body.extentSize),
        fieldImage: req.file? req.file.filename : ""
    }
    try {
        const updatedField = await updateField(fieldName, field);
        res.json(updatedField);
    } catch (err) {
        console.log("Error Updating field", err);
        res.status(400).send("Error updating field");
    }
})


router.delete("/delete/:fieldName",async (req,res)=>{
    const fieldName: string = req.params.fieldName;
    try{
        const deletedField = await deleteField(fieldName);
        res.json(deletedField);
    }catch (error){
        console.log("Error deleting field",error);
        res.status(400).send("Error deleting field");
    }
})

router.get("/view",async (req,res) => {
    try{
        const fields = await getAllFields();
        res.json(fields);
    }catch(err){
        console.log("Error getting all fields",err);
        res.status(400).send("Error getting all fields");
    }
})

router.get("/fields",async (req,res)=> {
    try{
        const fieldNames = await getAllFieldNames();
        res.json(fieldNames);
    }catch (error){
        console.log("Error getting field Names",error);
        res.status(400).send("Error getting field names");
    }
})

export default router;