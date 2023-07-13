const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Candidates = require('../models/candidates');

router.post('/users/:id/:pass', async (req, res, next) => {
  const userId = req.params.id;
  const password = req.params.pass;

  try {
    const user = await User.findOne({ user: userId, pass: password }, { nama: 1, user: 1, pass: 1, _id: 0 });

    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/show', async(req,res,next)=>{

    const {status, nama, id, addedDate, doneStatus, } = req.query
  try{  
    const filter = {}
    
    if(status){
      filter.status = status;
    }
    if(id){
      filter._id = id;
    }
    const data = await Candidates.find(filter).sort().limit();
    if(data.length === 0){
      res.status(404).json({message:"Gagal Menarik Data"})
    }
    res.json(data)
  }catch(err){
    next(err)
  }
})

router.post('/candidates', async (req,res,next)=>{
  const {
    nama,
    jenisKelamin,
    tanggalLahir,
    phone,
    email,
    domisili,
    pendTerakhir,
    univ,
    jurusan,
    ipk,
    perusahaan,
    posisiT,
    posisi,
    sumber,
    addedDate,
    HCDate,
    pysDate,
    userDate,
    offeringDate,
    MCUDate,
    hasilHC,
    hasilPys,
    hasilUser,
    hasilOffering,
    hasilMCU,
    status,
    doneStatus,
  } = req.body
  try{
    const insert = await Candidates.create({
    nama,
    jenisKelamin,
    tanggalLahir,
    phone,
    email,
    domisili,
    pendTerakhir,
    univ,
    jurusan,
    ipk,
    perusahaan,
    posisiT,
    posisi,
    sumber,
    addedDate,
    HCDate,
    pysDate,
    userDate,
    offeringDate,
    MCUDate,
    hasilHC,
    hasilPys,
    hasilUser,
    hasilOffering,
    hasilMCU,
    status,
    doneStatus
    });

    if(!insert){
      res.status(400).json({message:"Gagal Insert Data"})
    }

    res.json({ message: 'Data berhasil diinsert' });
    
    
    
  }catch(e){
    next(e)
  }
})

module.exports = router;
