import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import doctorRoute from './routes/doctor.js';
import appointmentRoute from './routes/appointment.js';

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
    origin: true
}

app.get('/', (req, res) => {
    res.send("WORKING")
})

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/medicall');
  console.log("connected to database");

}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); 

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/doctors', doctorRoute);
app.use('/api/appointments', appointmentRoute);

app.listen(port, () => {
    console.log("Serving on port " + port);
})