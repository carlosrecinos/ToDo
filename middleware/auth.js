var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');
var Usuario = require('../modelo/Usuario');

module.exports.isAuth = function(req,res,next){
    
    if(!req.headers.authorization){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(200).send({mensaje :"Prohibido el acceso"});
        return res
    }
    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token,config.SECRET_TOKEN);
    if(payload.exp<=moment().unix()){
        return res.status(401).send({mensaje:"Token caducado"});
    }
    Usuario.findOne({_id:payload.sub},(err,respuesta)=>{
        if(err){
            return res.status(401).send({mensaje:"Error: "+err});
        }else if(!respuesta){
            return res.status(401).send({mensaje:"Token Inválido"});
        }else{
            console.log(payload);
            req.payload = payload;
            next();
        }
    });
}

