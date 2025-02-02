import express from "express";
import multer from 'multer'
import {addField} from "../database/field-data-store";
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

export default router;