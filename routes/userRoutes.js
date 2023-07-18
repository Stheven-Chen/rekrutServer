const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Candidates = require('../models/candidates');
const Uuid = require('../models/uuid');
const crypto = require('crypto');


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

router.get('/generate', async(req,res, next)=>{
  const uniq = () =>{
    return crypto.randomUUID()
  }
  try{
    const kode = uniq()
    const body = {
      uuid : kode,
      status:0
    }
    const insertUUID = await Uuid.create(body)
    if(!insertUUID){
      res.status(400).json({message:"Gagal Membuat UUID Baru"})
    }    
    res.json({UUID:kode})
  }catch(e){
    next(e)
  }
})

router.post('/client/:uuid', async(req, res, next)=>{
  try{
    const {uuid} = req.params
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
      HCStatus,
      userStatus,
      pysStatus,
      offeringstatus,
      mcuStatus,
      lokasi,
      } = req.body
    const checkUUID = await Uuid.findOne({uuid})
    if(checkUUID.status===0){
      const updateUUID = await Uuid.updateOne({uuid},{
        $set:{status:1}
      })
      if(updateUUID.nModified !== 0){
        const insertData = await Candidates.create(
          {
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
          HCStatus,
          userStatus,
          pysStatus,
          offeringstatus,
          mcuStatus,
          lokasi,
          }
        )
        if(insertData.nModified === 0){
          res.status(500).json({message:"Gagal Insert Data"})
        }
        res.json("Sukses Insert Data")
      }
    }else{
      res.status(401).json("UUID Tidak Valid")

    }

   

  }catch(e){
    next(e)
  }
})

router.get('/show', async(req,res,next)=>{

    const {status, nama, id, addedDate, doneStatus, } = req.query
    const p = req.query.p || 1
    const dataPerPage = 12
    const skip = (p-1)*dataPerPage

  try{  
    const filter = {}
    
    if(status){
      filter.status = status;
    }
    if(id){
      filter._id = id;
    }

    const count = await Candidates.estimatedDocumentCount(filter);
    const data = await Candidates
    .find(filter)
    .sort({nama:1})
    .skip(skip)
    .limit(dataPerPage);
    if(data.length === 0){
      res.status(404).json({message:"Gagal Menarik Data"})
    }
    const pageCount = count/dataPerPage
    res.json([data, pageCount])
    
  }catch(err){
    next(err)
  }
})

router.post('/candidates', async (req,res,next)=>{
  const {id} = req.query;
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
HCStatus,
userStatus,
pysStatus,
offeringstatus,
mcuStatus,
lokasi,
  } = req.body
  try{

    if(id){
      const update = await Candidates.updateOne({_id:id},{
        $set:{
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
HCStatus,
userStatus,
pysStatus,
offeringstatus,
mcuStatus,
lokasi,
        }
      })
      if (update.nModified === 0) {
        return res.status(400).json({ message: 'Gagal memperbarui data' });
      }
      return res.json({ message: "Berhasil Update" });
    }

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
      HCStatus,
      userStatus,
      pysStatus,
      offeringstatus,
      mcuStatus,
      lokasi,
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
