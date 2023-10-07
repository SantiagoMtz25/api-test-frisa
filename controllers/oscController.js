const Osc = require("../model/org");
//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
//const verifyToken = require("../middleware/verify");

//Get All
async function getAllOsc(req, res){
    try {

        const results = await Osc.find({ });
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

//Add osc
async function oscRegister(req, res) {
    try {
      const { 
        adminName,
        rfc,
        description,
        phoneNumber,
        state,
        city,
        email,
        webpage,
        category,
        avg
       } = req.body;
      
      const existinOsc = await Osc.findOne({ email });
  
      if (existinOsc) {
        return res.status(400).json({ message: "El osc ya se encuentra dentro de registro" });
      } 

      const newOsc = new Osc({ 
        adminName: adminName,
        rfc: rfc,
        description: description,
        phoneNumber: phoneNumber,
        state: state,
        city: city,
        email: email,
        webpage: webpage,
        category: category,
        avg: avg
      });
      await newOsc.save();
      res.status(201).json({ message: "Registro de Osc exitoso" });
      
    } catch (error) {
      console.error('Error in osc register. Contact suport:',error.message);
      return res.status(500).json({ message: "Error sending request" });
    }
  }

  module.exports = {
    getAllOsc,
    oscRegister
  }
