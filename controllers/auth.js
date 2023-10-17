const User = require("../schemas/user");
const Osc = require("../schemas/org");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//User Register
async function userRegister(req, res) {
    console.log('Peticion Recibida para registro de usuario')
    try {
      const { 
        name,
        lastname,
        email,
        password, 
        phoneNumber,
        state,
        city
       } = req.body;
      
      const existingUser = await User.findOne({ phoneNumber });
  
      if (existingUser) {
        return res.status(400).json({ message: "El teléfono ya se encuentra registrado" });
      }

      let hashed_password = bcrypt.hashSync(password, 10);
  
      const newUser = new User({
        name: name,
        lastname: lastname,
        email: email,
        password: hashed_password,
        phoneNumber: phoneNumber,
        state: state,
        city: city
      });
      await newUser.save();
      console.log('Registro exitoso de usuario')
      return res.status(201).json({ message: "Registro exitoso" });

    } catch (error) {
      console.error('Error in user register. Contact support:',error.message);
      res.status(500).json({ message: "Error sending request" });
    }
}

//login
async function userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log('Request recived')
      if (!user || !bcrypt.compareSync(password, user.password)){
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
      // Revisamos si la user no existe y si la contraseña no es la misma y si ya esta admitida
      if ( bcrypt.compareSync(password, user.password) ) {
        
        const token = jwt.sign(
          { id: user._id },
          "your-secret-key",
          {
          expiresIn: "24h",
          }
        );
        console.log('User Login Succsesfull')
        return res.status(200).json({ 
          token: token,
          message: 'Login Succsesfull.',  
          isAdmin: user.isAdmin 
        });
      }
      console.log('No se pudo acceder')
      res.status(400).json({ message: 'No se pudo acceder'})
  
    } catch (error) {
      console.error('Error login in as user. Contact support:',error.message);
      res.status(500).json({ message: "Error login in as user" });
    }
}

//Osc Register
async function oscRegister(req, res) {
    try {
      const { 
        name,
        adminName,
        rfc,
        description,
        phoneNumber,
        state,
        city,
        email,
        webpage,
        category,
      } = req.body;
      console.log('Obtuve los datos de la Osc')
      const existinOsc = await Osc.findOne({ email });

      if (existinOsc) {
        console.log('Error la osc ya se encuentra dentro de registro')
        return res.status(400).json({ message: "El osc ya se encuentra dentro de registro" });
      } 

      const newOsc = new Osc({ 
        name: name,
        adminName: adminName,
        rfc: rfc,
        description: description,
        phoneNumber: phoneNumber,
        state: state,
        city: city,
        email: email,
        webpage: webpage,
        category: category,
      });
      await newOsc.save();

      res.status(201).json({ message: "Registro de Osc exitoso" });
      
    } catch (error) {
      console.error('Error in osc register. Contact suport:');
      return res.status(500).json({ message: "Error sending request" });
    }
}

//Osc login
async function oscLogin(req, res) {
    try {
      const { email, password } = req.body;
      
      const osc = await Osc.findOne({ email });
      
      if (!osc || !bcrypt.compareSync(password, osc.password)){
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
      // Revisamos si la osc no existe y si la contraseña no es la misma y si ya esta admitida
      if ( bcrypt.compareSync(password, osc.password) && osc.admited == true ) {
        
        const token = jwt.sign(
          { id: osc._id },
          "your-secret-key",
          {
          expiresIn: "1h",
          }
        );  
        return res.status(200).json({ 
          message: 'Login Succsesfull.', 
          token: token, 
          isAdmin: osc.isAdmin 
        });
      }
      
      res.status(400).json({ message: 'Aun no tiene permisos para acceder como Organizacion'})

    } catch (error) {
      console.error('Error login in as osc. Contact support:',error.message);
      res.status(500).json({ message: "Error login in as osc" });
    }
}


module.exports = {
    userLogin,
    userRegister,
    oscRegister,
    oscLogin
}
