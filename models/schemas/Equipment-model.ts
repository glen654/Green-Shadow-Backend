import mongoose from "mongoose";
import {EquipType} from "../enums/EquipType";
import {Status} from "../enums/Status";

const EquipSchema = new mongoose.Schema(
    {
        equipName: { type: String, required: true , unique: true },
        equipType: { type: String, required: true, enum:Object.values(EquipType) },
        status: {type: String, required: true,enum: Object.values(Status)},
        staffMember: { type: String, required: true },
        fieldName: { type: String, required: true },
    },
    {timestamps:true}
)

const EquipmentModel = mongoose.model("Equipment", EquipSchema);
export default EquipmentModel;

