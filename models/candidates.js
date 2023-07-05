const mongoose = require('mongoose');

const candidatesSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  jenisKelamin: {
    type: String,
    required: true,
  },
  tanggalLahir: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  domisili: {
    type: String,
    required: true,
  },
  pendTerakhir: {
    type: String,
    required: true,
  },
  univ: {
    type: String,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
  ipk: {
    type: String,
    required: true,
  },
  perusahaan: {
    type: String,
    required: true,
  },
  posisiT: {
    type: String,
    required: true,
  },
  posisi: {
    type: String,
    required: true,
  },
  sumber: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    required: true,
  },
  hasil: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    required: true,
  },
}, {collection :'candidates'});

const Candidates = mongoose.model('Candidates', candidatesSchema);

module.exports = Candidates;
