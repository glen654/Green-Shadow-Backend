import express from "express";
import {connectDB} from "./config/db";
import fieldRoutes from "./routes/field-routes"
import cropRoutes from "./routes/crop-routes"
import staffRoutes from "./routes/staff-routes"
import logRoutes from "./routes/log-routes"
import vehicleRoutes from "./routes/vehicle-routes"
import equipmentRoutes from "./routes/equipment-routes";

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// routes
app.use('/field', fieldRoutes);
app.use('/crop', cropRoutes);
app.use('/staff', staffRoutes);
app.use('/log',logRoutes);
app.use('/vehicle',vehicleRoutes);
app.use('/equipment',equipmentRoutes);

app.listen(3000,(err) => {
    console.log("Server running on port 3000");
});
