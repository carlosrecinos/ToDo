var mongoose = require('mongoose');

var Promise = mongoose.connect('mongodb://localhost:27017/todo',{useMongoClient : true},(err,res)=>{
    if(err){
        console.log("Error en la bd : "+err)
    }else{
        console.log('Conexión a la BD establecida');
    }
});

mongoose.Promise = global.Promise;