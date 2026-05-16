require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())

const sequelize = require("./config/database");

const userRoutes = require("./routes/user.router");
app.use("/api/users", userRoutes);

const patientrouter = require("./routes/patient.router");
app.use("/api/patients", patientrouter);

const docRouter = require("./routes/doc.router");
app.use("/api/doctors", docRouter);

const tretRouter = require("./routes/treatment.router");
app.use("/api/treatments", tretRouter);

const offerRouter = require("./routes/offer.router");
app.use("/api/offers", offerRouter);

const roomRouter = require("./routes/room.router");
app.use("/api/rooms", roomRouter);

const inventoryRouter = require("./routes/inventory.router");
app.use("/api/inventory", inventoryRouter);

const depRouter=require("./routes/dep.router");
app.use("/api/departments",depRouter)

const appRouter=require("./routes/appointment.router");
app.use("/api/appointments",appRouter);


const workScheduleRouter = require("./routes/workSchedule.router");
app.use("/api/work-schedules", workScheduleRouter);

const contactRouter = require("./routes/contact.router");
app.use("/api/contacts", contactRouter);

const DentalRecordRouter = require('./routes/dentalrecord.router');
app.use("/api/dental-history", DentalRecordRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});