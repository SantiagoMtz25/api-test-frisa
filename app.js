const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/routeuser");
const orgRoutes = require("./routes/routeorg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_DB =
  process.env.MONGO_DB || "mongodb+srv://santimtzv01:NK9d87DUH1NudDlR@cluster0.shiayac.mongodb.net/";
dbConnect();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/orgs/", orgRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto: ${PORT}`);
});

function dbConnect() {
  if (process.env.MONGO_DB) {
    console.log("Connecting to MongoDB in the cloud!");
  } else {
    console.log(`Connecting to Local instance of MongoDB : ${MONGO_DB}`);
  }

  mongoose.connect(MONGO_DB).then(() => console.log("Connected to DB!"));
}
