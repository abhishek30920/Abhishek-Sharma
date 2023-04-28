const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  _id: Number,
  name: String,
  url: String
});

const Company = mongoose.model('company', companySchema,'company');

module.exports = Company;