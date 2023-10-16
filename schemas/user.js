const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: String,
  lastname: String,
  email: String,
  password:  String,
  phoneNumber:  String,
  state:  String,
  city:  String,
  isAdmin: { type: Boolean, default: false },
  favoriteOrganizations: [{type: Schema.Types.ObjectId,ref: 'orgs' }]
});

module.exports = mongoose.model("Users", UserSchema);
