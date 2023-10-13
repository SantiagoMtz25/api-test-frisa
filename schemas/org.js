const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oscSchema = Schema({
  name: String,
  adminName: String,
  rfc: String,
  description: String,
  phoneNumber: String,
  state: String,
  city: String,
  email: String,
  webpage: String,
  category: String,
  password: { type: String, default: ''},
  valGiven: { type: Number, default: 0 },
  totalVotes: { type: Number, default: 0},
  avg: {type: Number, default: 0},
  isAdmin: { type: Boolean, default: true },
  admited: { type: Boolean, default: true }
});

module.exports = mongoose.model("Orgs", oscSchema);
