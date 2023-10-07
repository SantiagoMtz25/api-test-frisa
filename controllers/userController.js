const User = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Get all 
async function getAllUsers(req, res){
    try{
        //const counter = req.params;
        const results = await User.find({ isAdmin: false });
        if (results){
            return res.status(201).json({
              message : 'Users retrieved correclty',
              data: {
                  results
              }
            });
        }

        res.status(400).json({
            message: 'Users not found;'
        });

    } catch (error) {
      console.log('Error Retriving users. Contact support:',error.message);
      res.status(500).json({ message: "Error retreving users."});
    }
}
//Register
async function userRegister(req, res) {
    try {
      const { 
        lastname,
        email,
        phoneNumber,
        state,
        city,
        password,
        confirmPassword,
       } = req.body;
      
      const existingUser = await User.findOne({ phoneNumber });
  
      if (existingUser) {
        return res.status(400).json({ message: "El teléfono ya se encuentra registrado" });
      }

      if (password !== confirmPassword){
        return res.status(400).json({
          message: "Password and password confirmation doesn't match."
        });
      }
      
      let hashed_password = bcrypt.hashSync(password, 10);
  
      const newUser = new User({
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        state: state,
        city: city,
        password: hashed_password,
      });
      await newUser.save();
      res.status(201).json({ message: "Registro exitoso" });

    } catch (error) {
      console.error('Error in user register. Contact support:',error.message);
      res.status(500).json({ message: "Error sending request" });
    }
}
//login
async function userLogin(req, res) {
    try {
      const { lastname, password } = req.body;
  
      // Revisamos si el usuario existe.
      const user = await User.findOne({ lastname });
  
      // Revisamos si el usuario no existe y si la contraseña no es la misma
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
  
      // Generamos el token
      const token = jwt.sign(
        { name: user.name, userId: user._id },
        "your-secret-key",
        {
          expiresIn: "1h",
        }
      );
  
      res.status(200).json({ token: token, isAdmin: user.isAdmin });
    } catch (error) {
      console.error('Error login in. Contact support:',error.message);
      res.status(500).json({ message: "Error login in" });
    }
}

module.exports = {
    getAllUsers,
    userRegister,
    userLogin
}
