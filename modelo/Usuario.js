var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var services = require('../services');
var Schema = mongoose.Schema;


var UsuarioSchema = new Schema({
    nombre: String,
    email: {type : String, unique : true, lowercase:true},
    pass: {type : String},

});

UsuarioSchema.pre('save',function(next){
    var user = this;
    console.log(user);
    if(!user.isModified('pass')){
        console.log("no entra");
        return next();
    }else{
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                return next();
                console.log("no encripta"+err)
            }else{
                bcrypt.hash(user.pass,salt,null,(err,hash)=>{
                    if(err){
                        return next();
                        console.log("no encripta"+err)
                    }else{
                       user.pass = hash;
                       console.log(user.pass);
                       next(); 
                       
                    } 
        
                    
                });
            } 
    
           
    
        });
    }

    
});

module.exports = mongoose.model('Usuario',UsuarioSchema,'usuarios');