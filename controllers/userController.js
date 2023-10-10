const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
//Delete user favorites

//User Favorites
async function addfavorites(req,res){
  try {
    const {
      token,
      name,
      category
    } = req.body;

  } catch (error){
    console.log("Error adding to favorites.");
    return res.status(500).json({
      message: 'Error adding to favorites.',
      error: 'Internal Server Error'
    })
  }
}

//Register
async function userRegister(req, res) {
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
    
    if (!user || !bcrypt.compareSync(password, user.password)){
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    // Revisamos si la user no existe y si la contraseña no es la misma y si ya esta admitida
    if ( bcrypt.compareSync(password, user.password) ) {
      
      const token = jwt.sign(
        { name: user.name, userId: user._id },
        "your-secret-key",
        {
        expiresIn: "1h",
        }
      );  
      return res.status(200).json({ 
        message: 'Login Succsesfull.', 
        token: token, 
        isAdmin: user.isAdmin 
      });
    }
    
    res.status(400).json({ message: 'Aun no tiene permisos para acceder como Organizacion'})

  } catch (error) {
    console.error('Error login in as user. Contact support:',error.message);
    res.status(500).json({ message: "Error login in as user" });
  }
}


module.exports = {
    getAllUsers,
    userRegister,
    userLogin
}
