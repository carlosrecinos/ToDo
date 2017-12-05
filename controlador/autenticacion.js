var mongoose = require('mongoose');
var Usuario = require('../modelo/Usuario');
var service = require('../services');
var bcrypt = require('bcrypt-nodejs');



module.exports.registrar = function (req,res){
    var user = new Usuario({
        nombre : req.body.nombre,
        email : req.body.email,
        pass : req.body.pass
    });
    user.save((err)=>{
        if(err){
            res.status(500).send({mensaje: "Error: "+err});
        }else{
            //res.status(200).send({token : service.crearToken(user)});
            res.status(200).send({mensaje : "Usted se ha registrado exitosamente"});
        }
    });
}

module.exports.ingresar = function(req,res){
    var email = req.body.email;
    var pass = req.body.pass;

    Usuario.findOne({email:req.body.email},(err,user)=>{

        if(err)return res.status(500).send({mensaje: "Error: "+err});
        if(!user) return res.status(404).send({mensaje: "No existe este usuario " + email });
        var aut = bcrypt.compareSync(pass,user.pass);
        if(aut){
            res.status(200).send({token:  service.crearToken(user),
            usuario:user});
        }else if(!aut){
            res.status(404).send({mensaje: "Datos incorrectos"});
        }
    });
}
