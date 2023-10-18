const User = require("../schemas/user");
const Osc = require("../schemas/org");


//Get All
async function getAllOsc(req, res){
  try {
    console.log('----Peticion recibida----')
    const results = await Osc.find();
    if (results){
        const salud = await Osc.find({ category: "Salud"},{_id: true, name: true,	description: true, category: true, webpage:true, phoneNumber: true, email: true});
        const educacion = await Osc.find({ category: "Educacion"},{_id: true, name: true,	description: true, category: true, webpage:true, phoneNumber: true, email: true});
        const medioAmbiente = await Osc.find({ category: "Medio Ambiente"},{_id: true, name: true,	description: true, category: true, webpage:true, phoneNumber: true, email: true});
        const derechosHumanos = await Osc.find({ category: "Derechos Humanos"},{_id: true, name: true,	description: true, category: true, webpage:true, phoneNumber: true, email: true});
        const asociasionesReligiosas = await Osc.find({ category: "Asociaciones Religiosas"},{_id: true, name: true,	description: true, category: true, webpage:true, phoneNumber: true, email: true});
        const transportePublico = await Osc.find({ category: "Transporte Público"},{_id: true, name: true,	description: true, category: true, webpage:true, phoneNumber: true, email: true});
        const cultura = await Osc.find({ category: "Cultura"},{_id: true, name: true,	description: true, category: true, webpage:true, phoneNumber: true, email: true});
        const serviciosAsistenciales = await Osc.find({category: "Servicios Asistenciales"}, {_id: true, name: true,	description: true, category: true, webpage:true, phoneNumber: true, email: true});
        console.log('==== Organizaciones obtenidas ====')
        return res.status(201).json({
            salud: salud,
            educacion : educacion,
            medioAmbiente : medioAmbiente,
            derechosHumanos : derechosHumanos,
            asociasionesReligiosas : asociasionesReligiosas,
            transportePublico : transportePublico,
            cultura : cultura,
            serviciosAsistenciales : serviciosAsistenciales
        });
    }
    console.log('---- Organizaciones no encontradas ----')
    res.status(400).json({
        message: 'Organisations not found'
    });
  } catch (error){
      console.log('Error obteniendo las Organizaciones');
      return res.status(500).json({ message: "Error retriving Ocs requests."})
  }
}

//Org grade
async function orgGrade(req, res){
  try {
    console.log('Peticion Recibida');
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
    console.log('Error calificando organizacion');
    return res.status(500).json({
      message: 'Error grading osc.',
      error: 'Internal Server Error'
    })
  }
} 

//User add Favorites
async function addfavorites(req,res){
  try {
    console.log('Peticion recibida');
    const id = req.user.id;
    const {
      oscId
    } = req.body;

    const favOrg = await Osc.findOne ({ _id: oscId });
    if (!favOrg) {
      console.log('Organizacoin no encontrada')
      return res.status(404).json({ 
        message: 'Organization not found' 
      });
    }

    await User.updateOne(
      { _id: id }, 
      { $push: { favoriteOrganizations: favOrg } } 
    )
    console.log('Organization agregada a favoritos')
    return res.status(200).json({
      message: 'Organization Added to favorites.'
    })

  } catch (error){
    console.log("Error añadiendo a favoritos");
    return res.status(500).json({
      message: 'Error adding to favorites.',
      error: 'Internal Server Error'
    })
  }
}

//Get all fav
async function getAllFav(req,res){
  try{
    console.log('Peticion recibida')
    const userId = req.user;
    const results = await User.find({ _id: userId.id },{favoriteOrganizations: true});
    if (results){
      const array = results[0].favoriteOrganizations;
      var objects = []
      const len = array.length;
      for (var i = 0; i < len; i++){
        objects[i] = await Osc.find({ _id: array[i] },{ 
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
          avg: true 
        })
      }
      console.log('Organizaciones obtenidas exitosamente')
      return res.status(200).json({
        message: 'Favorite Organizatons retrieved succesfully.',
        objects
      })
    }
    console.log('Error no se pudo obtener las organizaciones')
    res.status(500).json({
      message:'Error user not found'
    })
  } catch(error){
    console.log('Error obteniendo los favoritos de ususario')
    return res.status(500).json({
      message: 'Error obteniendo los favoritos de ususario: ',
      error: 'Internal Server Error'
    })
  }
}

//Remove Fav
async function removeFavorite(req,res){
  try{
    console.log('Peticion recibida')
    const id = req.user.id;
    const { oscId } = req.body;
    const existingOscInFav = await User.find({ _id: id },{ favoriteOrganizations: oscId });

    if (existingOscInFav[0].favoriteOrganizations){
      await User.updateOne( { _id:id}, { $pull: { favoriteOrganizations: oscId } } )
      console.log('Organizacion removida de favoritos existosamente')
      return res.status(200).json({
        message:'Organization removed from fav succesfully'
      })
    }
    console.log('Organizacion no se encuentra en favoritos')
    res.status(500).json({
      message:'Organization not found on favorites'
    })
  }catch(error){
    console.log('Error no se pudo ejecutar la funcion')
    return res.status(500).json({
      message: 'Error removing from favourites',
      error: 'Internal Server Error'
    })
  }
}

//Update acount user
async function updateAccount(req,res){
  try{
    const userId = req.user.id;
    const {
      state,
      city,
      phoneNumber,
      password
    } = req.body;

    const exitingUser = await User.findOne({ _id: userId });
    if (exitingUser){
      if (state != ''){
        await User.updateOne({_id:userId},{$set:{ state: state }})
      }
      if (city != ''){
        await User.updateOne({_id:userId},{$set:{ city: city }})
      }
      if (phoneNumber != ''){
        await User.updateOne({_id:userId},{$set:{ phoneNumber: phoneNumber }})
      }
      if (password != ''){
        await User.updateOne({_id:userId},{$set:{ password: password }})
      }
      const updatedUser = await User.findOne({ _id: userId });
      return res.status(200).json({
        message: 'Account updated succsefuly',
        data: updatedUser
      })
    }

    res.status(500).json({
      message:'user not found'
    })
  
  }catch(error){
    console.log('Error actuallizando la cuenta');
    return res.status(500).json({
      message: 'Error actualizando la cuenta',
      error:'Internal Server Error'
    })
  }
}

module.exports = {
    addfavorites,
    orgGrade,
    getAllOsc,
    getAllFav,
    removeFavorite,
    updateAccount
}
