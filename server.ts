import express from "express";
import {connectDB} from "./config/db";
import fieldRoutes from "./routes/field-routes"

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// routes
app.use('/field', fieldRoutes);


app.listen(3000,(err) => {
    console.log("Server running on port 3000");
});