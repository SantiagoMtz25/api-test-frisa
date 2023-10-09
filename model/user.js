const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  lastname: String,
  email: String,
  phoneNumber:  String,
  state:  String,
  city:  String,
  password:  String,
  isAdmin: { type: Boolean, default: false },
  favoriteOrganizations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Orgs" },
  ],
});


module.exports = mongoose.model("users", UserSchema);

