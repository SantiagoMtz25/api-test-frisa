const User = require("../schemas/user");
const Osc = require("../schemas/org");

//Get all 
async function getAllUsers(req, res){
    try{
      console.log('Peticion recibida');
      const users = await User.find({ isAdmin: false },{ 
        _id : false,
        name: true, 
        lastname: true, 
        email: true, 
        phoneNumber: true, 
        state: true, 
        city: true 
      });
      if (users){
          console.log('Usuaros obtenidos')
          return res.status(201).json({
            message : 'Users retrieved correclty',
            users
          });
      }

      console.log('Usuarios no encontrados');
      res.status(204).json({
          message: 'Users not found;'
      });

    } catch (error) {
      console.log('Error obteniendo usuarios');
      res.status(500).json({ message: "Error retreving users."});
    }
}

//Get All
async function getAllOsc(req, res){
  try {
    console.log('Peticion recibida');
    const organizaions = await Osc.find({ admited: false }, { 
      name: true,
      adminName: true,
      rfc: true,
      description: true,
      phoneNumber: true,
      state: true,
      city: true,
      email: true,
      webpage: true,
      category: true,
      admited: true
      });
    if (organizaions){
      console.log('Orgaizaciones obtenidas correctamente')
      return res.status(201).json({
          message: 'Organisations list retrieved correctly',
          organizaions
      });
    }
    console.log('Organizaciones no encontradas')
    res.status(400).json({
        message: 'Organisations not found',
    });
  } catch (error){
      console.log('Error, no se ha podido obtener las organizaciones');
      return res.status(500).json({ message: "Error retriving Ocs requests."})
  }
}

// Accept an OSC request
async function acceptOsc(req, res){
  try{
    console.log('Peticion recibida')
    const id = req.params.id;
    const existingOsc = await Osc.findOne({ _id: id });
    if (existingOsc){
      if (existingOsc.admited != true){
        await Osc.updateOne( { _id: id }, {$set: { admited: true } } );
        const updatedOsc = await Osc.find({_id: id},{ name: true, email: true, admited: true });
        console.log('=======> Organizacion admitida:', updatedOsc.name)
        return res.status(200).json({
          message: "Organizacion admitida",
          OscAdmitida: updatedOsc
        })
      }
      console.log('La organizacion ya esta admitida')
      return res.status(201).json({
        message: 'La organizacion ya esta admitida'
      })
    } 

    console.log('Organizacion no encontrada')
    res.status(500).json({
      message: "Organizacion no encontrada"
    });

  } catch (error){
    console.log('Error, no se ha podido aceptar a la organizacion');
    return res.status(500).json({
      message: 'Error, no se ha podido aceptar a la organizacion',
      error: 'Internal Server Error'
    })
  }
}

// Reject osc
async function rejectOsc(req, res){
  try {
    console.log('Peticion recibida')
    const id = req.params.id;
    const oscInRegister = await Osc.findOne({ _id: id });
    if (oscInRegister){
      if(oscInRegister.admited == false){
        await Osc.deleteOne({ _id: id })
        console.log("xxxxx La organizacion fue rechazada xxxxxx");
        return res.status(200).json({
          message:'La organizacion ha sido rechazada y eliminada del registro'
        })
      } else if (oscInRegister.admited == false) {
        console.log("La organizacion ya fue admitida no la puede rechazar");
        return res.status(500).json({
          message: 'La organizacion ya se encuentra admitida no se puede rechazar'
        })
      }
    }
    res.status(204).json({
      message: 'Organizacion no encontrada'
    })
  } catch (error){
    console.log('Error no se pudo rechazar la organizacion')
    return res.status(500).json({
      message : 'Error no se pudo rechazar la organizacion',
      error: 'Internal Server Error'
    })
  }
}

// Edit Osc Account
async function editOsc(req, res){
  try{
    console.log('Peticion recibida')
    const {id}  = req.params;
    const {adminName} = req.body || '';
    const {category} = req.body || '';
    const {city} = req.body || '';
    const {description} = req.body || '';
    const {email} = req.body || '';
    const {name} = req.body || '';
    const {phoneNumber} = req.body || '';
    const {rfc} = req.body || '';
    const {state} = req.body || '';
    const {webpage} = req.body || '';
    const existingOsc = await Osc.findOne({ _id: id });
    console.log(existingOsc)
    if (existingOsc){
      if (adminName != ''){
        await Osc.updateOne({_id: id},{$set:{ adminName: adminName }})
      }
      if (name != ''){
        await Osc.updateOne({_id: id},{$set:{ name: name }})
      }
      if (rfc != ''){
        await Osc.updateOne({_id: id},{$set:{ rfc: rfc }})
      }
      if (description != ''){
        await Osc.updateOne({_id: id},{$set:{ description: description }})
      }
      if (phoneNumber != ''){
        await Osc.updateOne({_id: id},{$set:{ phoneNumber: phoneNumber }})
      }
      if (state != ''){
        await Osc.updateOne({_id: id},{$set:{ state: state }})
      }
      if (city != ''){
        await Osc.updateOne({_id: id},{$set:{ city: city }})
      }
      if (email != ''){
        await Osc.updateOne({_id: id},{$set:{ email: email }})
      }
      if (webpage != ''){
        await Osc.updateOne({_id: id},{$set:{ webpage: webpage }})
      }
      if (category != ''){
        await Osc.updateOne({_id: id},{$set:{ category: category }})
      }
      console.log('Cuenta de organizacion actualizada con los datos proporcionados');
      return res.status(200).json({
        message: 'Cuenta de organizacion actualizada con los datos proporcionados'
      });
    }

    res.status(500).json({
      message:'Organizacion no encontrada'
    })

  } catch (error){
    console.log('Error no se pudo actualizar la cuenta de la organizacion');
    return res.status(500).json({
      message: 'Error no se pudo actualizar la cuenta de la organizacion',
      error: 'Internal Server Error'
    })
  }
}

// Get osc by id
async function getOscById(req,res){
  try{
    console.log('Peticion recibida')
    const {id} = req.params;
    const org = await Osc.findOne({_id:id},{
      name: true,
      adminName: true,
      rfc: true,
      description: true,
      phoneNumber: true,
      state: true,
      city: true,
      email: true,
      webpage: true,
      category: true,
      avg: true,
      admited: true
    });
    if(org){
      console.log('Organizacion obtenida')
      return res.status(200).json({
        message:'Organizacion obtenida',
        data: { org }
      })
    }
  } catch (error){
    console.log('Error no se pudo obtener la osc');
    return res.status(500).json({
      message: 'Error no se pudo obtener la osc',
      error: 'Internal Server Error'
    })
  }
}

// Osc Register
async function uploadExcelOsc(req, res) {
  try {
    const oscs = req.body;
    for (const oscData of oscs) {
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
            password
        } = oscData;

        console.log('Intentando registrar la Osc con email:', email);

        const existingOsc = await Osc.findOne({ email });

        if (existingOsc) {
            console.log(`Error: la osc con email ${email} ya se encuentra dentro de registro`);
            continue; // pasa al siguiente registro si ya existe
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
            password: hashed_password
        });

        await newOsc.save();
        console.log('Registro de Osc exitoso para:', email);
    }

    res.status(201).json({ message: "Proceso de registro de OSC completado" });

  } catch (error) {
      console.error('Error in osc register. Contact support:', error);
      return res.status(500).json({ message: "Error sending request" });
  }
}
module.exports={
  getAllUsers,
  getAllOsc,
  acceptOsc,
  rejectOsc,
  editOsc,
  getOscById,
  uploadExcelOsc
}