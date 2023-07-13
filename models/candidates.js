const mongoose = require('mongoose');

const candidatesSchema = new mongoose.Schema({
  nama: String,
  jenisKelamin: String,
  tanggalLahir: String,
  phone: String,
  email: String,
  domisili: String,
  pendTerakhir: String,
  univ: String,
  jurusan: String,
  ipk: String,
  perusahaan: String,
  posisiT: String,
  posisi: String,
  sumber: String,
  addedDate: String,
  HCDate: String,
  pysDate: String,
  userDate: String,
  offeringDate: String,
  MCUDate: String,
  hasilHC: String,
  hasilPys: String,
  hasilUser: String,
  hasilOffering: String,
  hasilMCU: String,
  status: String,
  doneStatus:String,
  

}, {collection :'candidates'});

const Candidates = mongoose.model('Candidates', candidatesSchema);

module.exports = Candidates;
