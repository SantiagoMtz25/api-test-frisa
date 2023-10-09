const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oscSchema = Schema({
  adminName: String,
  rfc: String,
  description: String,
  phoneNumber: String,
  state: String,
  city: String,
  email: String,
  webpage: String,
  category: String,
  avg: Number,
  admited: { type: Boolean, default: false}
});

module.exports = mongoose.model("Orgs", oscSchema);
