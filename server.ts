import express from "express";
import * as mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb://localhost:27017/Green-Shadow");
const db = mongoose.connection

db.on("error", (err) => {
    console.error("DB connection error",err);
})

db.on("open",()=> {
    console.log("DB connected successfully");
})

app.use(express.json());
app.use('/',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');

    next();
})

app.listen(3000,(err) => {
    console.log("Server running on port 3000");
});