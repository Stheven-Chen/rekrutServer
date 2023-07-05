const mongoose = require('mongoose');

const db = 'rekrut';
const password = 'Ssmmg021717';
const dbURIrekrut = `mongodb+srv://user:${password}@stheven.qoxhup8.mongodb.net/${db}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURIrekrut, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Terhubung ke database rekrut');
  } catch (err) {
    console.log(`Kesalahan koneksi MongoDB rekrut: 
    ${err}`);
  }

};

module.exports = connectDB;
