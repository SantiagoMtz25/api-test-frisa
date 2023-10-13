const User = require("../schemas/user");
const Osc = require("../schemas/org");
const user = require("../schemas/user");

//Get all 
async function getAllUsers(req, res){
    try{

      const userName = req.params.userName;
      if (userName){
        const result = await User.find({ name: userName });
        if (result){
            return res.status(201).json({
                message: 'User retrieved correctly',
                data: {
                    result
                },
            });
        }
      }
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

//User add Favorites
async function addfavorites(req,res){
  try {
    const id = req.user.id;
    const {
      name,
      category
    } = req.body;

    const favOrg = await Osc.findOne ({ name: name, category: category });
    console.log(favOrg);
    if (!favOrg) {
      return res.status(404).json({ 
        message: 'Organization not found' 
      });
    }

    await User.updateOne(
      { _id: id }, 
      { $push: { favoriteOrganizations: favOrg } } 
    )
    console.log('Organization Added to favorites')
    return res.status(200).json({
      message: 'Organization Added to favorites.'
    })

  } catch (error){
    console.log("Error adding to favorites.", error.message);
    return res.status(500).json({
      message: 'Error adding to favorites.',
      error: 'Internal Server Error'
    })
  }
}

//Get all fav
async function getAllFav(req,res){
  try{
    const userId = req.user;
    const results = await User.find({ _id: userId });

  } catch(error){
    console.log('Error obteniendo los favoritos de ususario:', error.message)
    return res.status(500).json({
      message: 'Error obteniendo los favoritos de ususario: ',
      error: 'Internal Server Error'
    })
  }
}


module.exports = {
    getAllUsers,
    addfavorites,
    orgGrade
}
