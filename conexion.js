var mongoose = require('mongoose');

var Promise = mongoose.connect('mongodb://admin:admin@ds047762.mlab.com:47762/tareas',{useMongoClient : true},(err,res)=>{
    if(err){
        console.log("Error en la bd : "+err)
    }else{
        console.log('Conexión a la BD establecida');
    }
});

mongoose.Promise = global.Promise;