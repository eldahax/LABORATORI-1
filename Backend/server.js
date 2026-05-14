const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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

const contactRouter = require("./routes/contact.router");
app.use("/api/contacts", contactRouter);

const workScheduleRouter = require("./routes/workSchedule.router");
app.use("/api/work-schedules", workScheduleRouter);

const DentalRecordRouter = require('./routes/dentalrecord.router');
app.use("/api/dental-history", DentalRecordRouter);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});