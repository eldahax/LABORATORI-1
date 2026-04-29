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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});