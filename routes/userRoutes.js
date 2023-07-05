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

router.get('/candidates', async (req,res,next)=>{
  try{
    const candidates = await Candidates.find();
    if(candidates){
      res.json(candidates)
    }else{
      res.status(404).json({Messages:"Not Found"})
    }
  }catch(e){
    next(e)
  }
})

module.exports = router;
