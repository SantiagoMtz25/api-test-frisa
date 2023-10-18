const Osc = require("../schemas/org");


//Update Osc Account
async function orgUpdateAcount(req,res){
  try {
    console.log('Peticion recibida')
    const oscId = req.osc.id;
    const {
      state,
      city,
      phoneNumber,
      description,
      rfc,
      webpage,
      category
    } = req.body || '';

    const results = await Osc.findOne({ _id: oscId });
    if (results){
      if (state != ''){
        await Osc.updateOne({ _id:oscId },{ $set:{ state: state } })
      }
      if (city != ''){
        await Osc.updateOne({ _id:oscId },{ $set:{ city: city } })
      }
      if (phoneNumber != ''){
        await Osc.updateOne({ _id:oscId },{ $set:{ phoneNumber: phoneNumber } })
      }
      if (description != ''){
        await Osc.updateOne({ _id:oscId },{ $set:{ description: description } })
      }
      if (rfc != ''){
        await Osc.updateOne({ _id:oscId },{ $set:{ rfc: rfc } })
      }
      if (webpage != ''){
        await Osc.updateOne({ _id:oscId },{ $set:{ webpage: webpage } })
      }
      if (category != ''){
        await Osc.updateOne({ _id:oscId },{ $set:{ category: category } })
      }
      console.log('La cuenta de la osc ha sido actualizada exitosamente, gracias por su atencion hasta luego')
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

async function getGrade(req,res){
  try{
    console.log('Peticion recibida')
    const oscId = req.osc.id;
    const osc = await Osc.findOne({ _id:oscId });

    if (osc){
      console.log('Puntaje de la organizacion obtenido')
      const avg = osc.avg
      return res.status(200).json({
        avg: avg
      });
    }

    console.log('Organizacion no encontrada')
    res.status.json(204).json({
      message: 'Organizacion no encontrada'
    })
  } catch(error){
    console.log('Error obteniendo el garde')
  }
}

module.exports = {
  orgUpdateAcount,
  getGrade
}
