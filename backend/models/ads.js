const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  _id: Number,
  companyId: Number,
  primaryText: String,
  headline: String,
  description: String,
  CTA: String,
  imageUrl: String
});

const ads = mongoose.model('ads', adSchema,'ads');

module.exports = ads;