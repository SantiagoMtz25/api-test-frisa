const User = require("../schemas/user");
const Osc = require("../schemas/org");

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

//User Favorites
async function addfavorites(req,res){
  try {
    const id = req.user.id;
    const {
      name,
      category
    } = req.body;

    const favOrg = await Osc.findOne ({ name: name, category: category });
    if (favOrg) {
      await User.updateOne(
        { _id: id },
        { $set: {
          favoriteOrganizations : [ favOrg.id ]
        }}
      );
      return res.status(200).json({
        message: 'Organization Added to favorites.'
      })
    }
    res.status(201).json({
      message: 'No organizations were selected. Cannot add to favorites.'
    }); 

  } catch (error){
    console.log("Error adding to favorites.");
    return res.status(500).json({
      message: 'Error adding to favorites.',
      error: 'Internal Server Error'
    })
  }
}



module.exports = {
    getAllUsers,
    addfavorites,
    orgGrade
}
