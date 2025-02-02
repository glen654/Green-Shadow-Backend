import mongoose, {Schema} from "mongoose";

const FieldSchema = new mongoose.Schema(
    {
        fieldId: { type: String, unique: true },
        fieldName: {type:String, required:true,unique:true},
        location: {type:String, required:true},
        extentSize: {type:Number, required:true},
        fieldImage: {type:String, required:true},
    },
    {timestamps:true}
)

FieldSchema.pre("save", async function(next) {
    if(!this.fieldId){
        const count = await mongoose.model("Field").countDocuments();
        this.fieldId = `Field_${count + 1}`;
    }
})

const FieldModel = mongoose.model("Field", FieldSchema);
export default FieldModel;