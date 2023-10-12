const Osc = require("../schemas/org");

//Get All
async function getAllOsc(req, res){
    try {
      const orgName = req.params.name;
      if (orgName){
        const result = await Osc.findOne({ name: orgName });
        if (result){
            return res.status(201).json({
                message: 'Organisation retrieved correctly',
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

//Update Osc Account
async function orgUpdateAcount(req,res){
  try {
    const id = req.user.id;
    const {
      state,
      city,
      phoneNumber,
      description,
      rfc,
      webpage,
      category
    } = req.body;

    const results = await Osc.findOne({ _id: id });
    if (results){
      await Osc.updateOne(
        { 
        _id: results.id 
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

module.exports = {
  getAllOsc,
  orgUpdateAcount,

}
