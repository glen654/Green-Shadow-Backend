import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
    {
        logName: {type: String, required: true, unique: true},
        logDate: {type: Date, required: true},
        logImage: {type: String, required: true},
        fieldName: {type: String, required: true},
        cropName: {type: String, required: true},
        staffMember: {type: String,required:true},
    },
    {timestamps:true}
)

const LogModel = mongoose.model("Log", LogSchema);
export default LogModel;