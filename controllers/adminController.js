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
    const existingOsc = await Osc.find({ _id: id });
    if (existingOsc){
      if (existingOsc[0].admited != true){
        await Osc.updateOne( { _id: id }, {$set: { admited: true } } );
        const updatedOsc = await Osc.find({_id: id},{ name: true, email: true, admited: true });
        console.log('=======> Organizacion admitida:', updatedOsc[0].name)
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


module.exports={
  getAllUsers,
  getAllOsc,
  acceptOsc,
}