const mongoose = require("mongoose");

const Tache = mongoose.model(
  "tache",
  new mongoose.Schema({
    date_planifiee: Date,
    date_realise: Date,
    code_fab:String,
    produit:Number,
    realise:Number,
    retard:Number,
    anticipe:Number,
    email:String,
    type:String,
    atelier:String,
  })
);

module.exports = Tache;