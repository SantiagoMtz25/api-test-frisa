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
  favoriteOrganizations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Orgs" },
  ],
});

module.exports = mongoose.model("Users", UserSchema);
