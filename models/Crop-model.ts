import mongoose from "mongoose";

const CropSchema = new mongoose.Schema(
    {
        commonName: {type: String, required: true,unique: true},
        scientificName: {type: String, required: true},
        category: {type: String, required: true},
        cropImage: {type: String, required: true},
        fieldName:{type: String, required: true},
    },
    {timestamps:true}
)

const CropModel = mongoose.model("Crop",CropSchema);
export default CropModel;