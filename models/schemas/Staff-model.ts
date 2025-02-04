import mongoose from "mongoose";
import {Gender} from "../enums/Gender";

const StaffSchema = new mongoose.Schema(
    {
        name: { type: String, required: true,unique: true },
        designation: { type: String, required: true },
        gender: { type: String, required: true,enum: Object.values(Gender) },
        joinedDate: { type: Date, required: true },
        dob: { type: Date, required: true },
        address: { type: String, required: true },
        contact: { type: String, required: true },
        email: { type: String, required: true },
        fieldName: { type: String, required: true },
    },
    {timestamps: true}
)

const StaffModel = mongoose.model("Staff",StaffSchema);
export default StaffModel;