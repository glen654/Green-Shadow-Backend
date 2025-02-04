import express from "express";
import multer from "multer";
import {Log} from "../models/dtos/Log";
import {addLog, deleteLog, getAllLogs, updateLog} from "../database/log-data-store";
import exp from "node:constants";
import {storage} from "../util/Storage";

const router = express.Router();

const upload = multer({ storage: storage });

router.post("/add", upload.single("logImage"),async (req,res) => {
    const log:Log = {
        logName: req.body.logName,
        logDate: new Date(req.body.logDate),
        logImage: req.file? req.file.filename : "",
        fieldName: req.body.fieldName,
        cropName: req.body.cropName,
        staffMember: req.body.staffMember
    };
    try{
        const addedLog = await addLog(log);
        res.json(addedLog);
    }catch (err){
        console.log("Error saving log",err);
        res.status(400).send("Error adding log");
    }
})

router.put("/update/:logName", upload.single("logName"),async (req,res)=> {
    const logName: string = req.params.logName;
    const log:Log = {
        logName: req.body.logName,
        logDate: new Date(req.body.logDate),
        logImage: req.file? req.file.filename : "",
        fieldName: req.body.fieldName,
        cropName: req.body.cropName,
        staffMember: req.body.staffMember
    };
    try{
        const updatedLog = await updateLog(logName,log);
        res.json(updatedLog);
    }catch (err){
        console.log("Error updating log", err);
        res.status(400).send("Error updating log");
    }
})

router.delete("/delete/:logName",async (req,res) => {
    const logName: string = req.params.logName;
    try{
        const deletedLog = await deleteLog(logName);
        res.json(deletedLog);
    }catch (error){
        console.log("Error deleting log",error);
        res.status(400).send("Error deleting log");
    }
})

router.get("/view",async (req,res)=> {
    try{
        const logs = await getAllLogs();
        res.json(logs);
    }catch (err){
        console.log("Error getting all logs",err);
        res.status(400).send("Error getting all logs");
    }
})

export default router;

