//Importacion de librerias y cosas necesarias para correr el programa
const express = require("express");
const dotenv = require("dotenv");
const connectionDB = require('./config');

//Guardamos las rutas en donde se encuentra el router de user y osc

const userRoutes = require("./routes/routeuser");
const oscRoutes = require("./routes/routeorg");


//Cuando en el link lea /users o /ocs accedera a las rutas ya declaradas previamente
const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/osc", oscRoutes);
dotenv.config()

//Mostramos en que puerto se esta corriendo el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto: ${PORT}`);
});

//Mostramos que se haya conectado a la base de datos
connectionDB()