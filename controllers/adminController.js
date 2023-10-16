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

      res.status(204).json({
          message: 'Users not found;'
      });

    } catch (error) {
      console.log('Error Retriving users. Contact support:',error.message);
      res.status(500).json({ message: "Error retreving users."});
    }
}

//Get All
async function getAllOsc(req, res){
  try {
    const orgName = req.params.name;
    if (orgName){
      const results = await Osc.find();
      if (results){
          return res.status(200).json({
              message: 'Organisations retrieved correctly',
              data: results.rowCount
              
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
        message: 'Organisations not found',
        data: {
            results
        }
    });
  } catch (error){
      console.log(error.message);
      return res.status(500).json({ message: "Error retriving Ocs requests."})
  }
}

module.exports={
  getAllUsers,
  getAllOsc
}