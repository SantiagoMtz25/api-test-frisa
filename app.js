//Importacion de librerias y cosas necesarias para correr el programa
const express = require("express");
const mongoose = require("mongoose");

//Guardamos las rutas en donde se encuentra el router de user y osc
//Ojo que solo hice tablas para user y osc debido a que con un valor booleano podemos identificar con  true a un admin y false a un usuario
//asi nos ahorramos una tabla

const userRoutes = require("./src/routes/userRouter");
const oscRoutes = require("./src/routes/oscRouter");
require("dotenv").config();

//Declaracion de variables para la coneccion a base de datos en mongo
const app = express();
const PORT = process.env.PORT || 3000; //El puerto al que se conectara la aplicacion es al puerto 3000
const MONGO_DB =
  process.env.MONGO_DB || "mongodb://127.0.0.1:27017/frisa_app_db"; //link de coneccion a base de datos este varia en mi caso la base de datos la llame frisa_app_db lo demas se queda igual
dbConnect();

//Cuando en el link lea /users o /ocs accedera a las rutas ya declaradas previamente
app.use(express.json());
app.use("/users", userRoutes);
app.use("/osc", oscRoutes);

//Mostramos en que puerto se esta corriendo el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto: ${PORT}`);
});

//Mostramos que se haya conectado a la base de datos
function dbConnect() {
  if (process.env.MONGO_DB) {
    console.log("Connecting to MongoDB in the cloud!");
  } else {
    console.log(`Connecting to Local instance of MongoDB : ${MONGO_DB}`);
  }

  mongoose.connect(MONGO_DB).then(() => console.log("Connected to DB!"));
}
