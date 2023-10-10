const Osc = require("../schemas/org");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Get All
async function getAllOsc(req, res){
    try {
      const orgName = req.params.name;
      if (orgName){
        const result = await Osc.find({ name: orgName });
        if (result){
            return res.status(201).json({
                message: 'Organisations retrieved correctly',
                data: {
                    result
                },
            });
        }
      }
      const results = await Osc.find({});
      if (results){
          return res.status(201).json({
              message: 'Organisations list retrieved correctly',
              data: {
                  results
              },
          });
      }
      res.status(400).json({
          message: 'There are no Organisations registered',
          data: {
              results
          }
      });
    } catch (error){
        console.log(error.message);
        return res.status(500).json({ message: "Error retriving Ocs requests."})
    }
}

//Org grade
async function orgGrade(req, res){
  try {
    const { name, avg } = req.body  ;

    const results = await Osc.findOne({ name: name });
    if (results){
      const updatedvalGiven = results.valGiven + avg;
      const updatedTotVotes = results.totalVotes + 1;
      const newAvg = (updatedvalGiven/updatedTotVotes);
      const rounded = newAvg.toFixed(1);
      
      await Osc.updateOne(
        { email: results.email }, 
        { $set: { 
          valGiven: updatedvalGiven, 
          totalVotes: updatedTotVotes, 
          avg: rounded }
        });

      return res.status(200).json({
        message: 'Grade changed succsesfully',
      });
    }

    res.status(201).json({
      message: 'No osc selected to grade.'
    })

  } catch (error){
    console.log('Error grading osc:',error.message);
    return res.status(500).json({
      message: 'Error grading osc.',
      error: 'Internal Server Error'
    })
  }
} 

//Register osc
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
        password,
        admited
      } = req.body;
      
      const existinOsc = await Osc.findOne({ email });
  
      if (existinOsc) {
        return res.status(400).json({ message: "El osc ya se encuentra dentro de registro" });
      } 

      let hashed_password = bcrypt.hashSync(password, 10);

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
        password: hashed_password,
        admited: admited
      });
      await newOsc.save();

      res.status(201).json({ message: "Registro de Osc exitoso" });
      
    } catch (error) {
      console.error('Error in osc register. Contact suport:',error.message);
      return res.status(500).json({ message: "Error sending request" });
    }
}

//Update Osc Account
async function orgUpdateAcount(req,res){
  try {
    const {
      token,
      state,
      city,
      phoneNumber,
      description,
      rfc,
      webpage,
      category
    } = req.body;

    const results = await Osc.findOne({ phoneNumber: phoneNumber });
    if (results){
      await Osc.updateOne(
        { 
        phoneNumber: results.phoneNumber 
        },
        {
          $set:{
            state: state,
            city: city,
            phoneNumber: phoneNumber,
            description: description,
            rfc: rfc,
            webpage: webpage,
            category:category
          }
        }
      );
      return res.status(200).json({
        message: 'Organization information updated succesfully.'
      })
    }
  } catch (error){
    console.log('Error updating functionality:',error.message);
    return res.status(500).json({
      message: 'Error updating functionality.',
      error: 'Internal Server Error'
    })
  }
}

//login
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
          { name: osc.name, userId: osc._id },
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
  getAllOsc,
  orgGrade,
  oscRegister,
  orgUpdateAcount,
  oscLogin
}
