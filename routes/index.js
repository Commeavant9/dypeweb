var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uid2 = require('uid2')
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')
var salt = uid2(32)

var userModel = require('../models/users')


/* GET home page. */
router.post('/sign-up', async function(req, res, next) {

  var error = []
  var result = false
  var saveUser = null
  var token = null

  console.log('00', req.body)
  const dataUser = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(dataUser != null){
    error.push('utilisateur déjà inscrit')
  }
  console.log('01',dataUser)
  console.log('02', error)
  if(req.body.lastNameFromFront == ''
  || req.body.firstNameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }
 
  if(error.length == 0){

    var newUser = new userModel({
          lastName: req.body.lastNameFromFront,
          firstName: req.body.firstNameFromFront,
          email: req.body.emailFromFront,
          password: SHA256(req.body.passwordFromFront + salt).toString(encBase64),
          salt: salt,
          token: uid2(32),
    });

    const saveUser = await newUser.save();

    if(saveUser){
      result = true
      token = saveUser.token
    }
  }

  res.json({result,saveUser, error, token});

})

module.exports = router;
