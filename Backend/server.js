const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const sequelize = require("./config/database");

const userRoutes = require("./routes/user.router");
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});