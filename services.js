var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');
var bcrypt = require('bcrypt-nodejs');
var express = require('express');

module.exports.crearToken = function(user){
    var payload = {
    sub : user._id,
    iat : moment().unix(),
    exp : moment().add(14,'days').unix(),
    };
    return jwt.encode(payload,config.SECRET_TOKEN);
}

module.exports.encriptar = function(user,next){
    console.log("Entra a enc");
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            console.log(err)
        }else{
            bcrypt.hash(user.pass,salt,null,(err,hash)=>{
                if(err){
                    console.log(err)
                }else{
                    user.pass = hash;
                    next();
                }
            })
        }
    })
    
}

module.exports.decodeToken = function(token){
    
}