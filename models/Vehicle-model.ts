import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
    {
        licensePlateNumber: {type: String, required: true,unique: true},
        category: {type: String, required: true},
        fuelType: {type: String, required: true,enum: Object.values(FuelType)},
        status: {type: String, required: true,enum: Object.values(Status)},
        remarks: {type: String, required: true},
        staffMember: {type: String, required: true},
    },
    {timestamps:true}
)

const VehicleModel = mongoose.model('Vehicle', VehicleSchema);
export default VehicleModel;