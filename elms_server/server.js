import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoute from "./routes/adminRoute.js";
import empRoute from "./routes/empRoute.js";
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', adminRoute)
app.use('/api/emp',empRoute)

app.listen(PORT, ()=>console.log(`Server is listening on the port: `, PORT ))

