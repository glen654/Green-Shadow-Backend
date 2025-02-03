import express from "express";
import multer from "multer";
import {Crop} from "../models/Crop";
import {addCrop, deleteCrop, getAllCrops, updateCrop} from "../database/crop-data-store";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});


const upload = multer({ storage: storage });

router.post("/add",upload.single("cropImage"), async (req, res) => {
    const crop:Crop = {
        commonName: req.body.commonName,
        scientificName: req.body.scientificName,
        category: req.body.category,
        cropImage: req.file? req.file.filename : "",
        fieldName: req.body.fieldName
    };
    try{
        const addedCrop = await addCrop(crop);
        res.json(addedCrop);
    }catch(err){
        console.log("Error Saving crop",err);
        res.status(400).send("Error adding crop");
    }
})

router.put("/update/:commonName",upload.single("cropImage"),async (req,res) => {
    const commonName: string = req.params.commonName;
    const crop:Crop = {
        commonName: req.body.commonName,
        scientificName: req.body.scientificName,
        category: req.body.category,
        cropImage: req.file? req.file.filename : "",
        fieldName: req.body.fieldName
    };
    try{
        const updatedCrop = await updateCrop(commonName,crop);
        res.json(updatedCrop);
    }catch(err){
        console.log("Error updating crop", err);
        res.status(400).send("Error updating crop");
    }
})

router.delete("/delete/:commonName",async (req,res) => {
    const commonName: string = req.params.commonName;
    try{
        const deletedCrop = await deleteCrop(commonName);
        res.json(deletedCrop);
    }catch(err){
        console.log("Error deleting crop",err);
        res.status(400).send("Error deleting crop");
    }
})

router.get("/view",async (req,res) => {
    try{
        const crops = await getAllCrops();
        res.json(crops);
    }catch(err){
        console.log("Error getting all crops",err);
        res.status(400).send("Error getting all crops");
    }
})

export default router;
