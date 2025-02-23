import express from "express";
import fieldRoutes from "./routes/field-routes"
import cropRoutes from "./routes/crop-routes"
import staffRoutes from "./routes/staff-routes"
import logRoutes from "./routes/log-routes"
import vehicleRoutes from "./routes/vehicle-routes"
import equipmentRoutes from "./routes/equipment-routes";
import UserRoutes from "./routes/user-routes";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config()

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));


// routes
app.use('/auth', UserRoutes);
app.use('/field', fieldRoutes);
app.use('/crop', cropRoutes);
app.use('/staff', staffRoutes);
app.use('/log',logRoutes);
app.use('/vehicle',vehicleRoutes);
app.use('/equipment',equipmentRoutes);
app.use('/uploads',express.static("uploads"));

app.listen(3000,(err) => {
    console.log("Server running on port 3000");
});
