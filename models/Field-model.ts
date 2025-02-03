import mongoose, {Schema} from "mongoose";

const FieldSchema = new mongoose.Schema(
    {
        fieldName: {type:String, required:true,unique:true},
        location: {type:String, required:true},
        extentSize: {type:Number, required:true},
        fieldImage: {type:String, required:true},
    },
    {timestamps:true}
)

const FieldModel = mongoose.model("Field", FieldSchema);
export default FieldModel;