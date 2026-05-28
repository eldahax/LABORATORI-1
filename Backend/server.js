require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
app.use("/api/payments", require("./routes/payment.router"));

app.use(express.json());

const sequelize = require("./config/database");


app.use("/api/users", require("./routes/user.router"));
app.use("/api/patients", require("./routes/patient.router"));
app.use("/api/doctors", require("./routes/doc.router"));
app.use("/api/treatments", require("./routes/treatment.router"));
app.use("/api/reviews", require("./routes/review.router"));
app.use("/api/offers", require("./routes/offer.router"));
app.use("/api/rooms", require("./routes/room.router"));
app.use("/api/inventory", require("./routes/inventory.router"));
app.use("/api/departments", require("./routes/dep.router"));
app.use("/api/appointments", require("./routes/appointment.router"));
app.use("/api/work-schedules", require("./routes/workSchedule.router"));
app.use("/api/contacts", require("./routes/contact.router"));
app.use("/api/dental-history", require("./routes/dentalrecord.router"));
app.use("/api/reminders", require("./routes/reminder.router"));
app.use("/api/payments",require("./routes/payment.router"))



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});