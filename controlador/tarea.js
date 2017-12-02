var Tarea = require('../modelo/Tarea');

module.exports.mostrarTareas = function(req,res){
    console.log(req.ip)
    Tarea.find({},(err,tareas)=>{
        if(err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(500).send({mensaje: "Error: "+err});
        }else if(!tareas){
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(404).send({mensaje: "No se encontró la tarea: "+err});
        }else{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send(tareas);
        }
    });
}

module.exports.mostrarTarea = function(req,res){
    var id = req.params.idTarea;
    Tarea.findById({autor:req.payload.sub},id,(err,tarea)=>{
        if(err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(500).send({mensaje: "Error: "+err});
        }else if(!tarea){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(404).send({mensaje: "No se encontró la tarea: "+err});
        }else{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send(tarea);
        }
    });
}

module.exports.insertarTarea = (req,res) => {

    var tarea = new Tarea();
    tarea.titulo = req.body.titulo;
    tarea.descripcion = req.body.descripcion;
    tarea.fechaEntrega = req.body.fechaEntrega;
    tarea.autor = req.body.autor;

    tarea.save((err,tareaInsertada)=>{
        if(err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send({mensaje: "Error: "+err});
            console.log("ERROR: ",err)
        }else{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send({mensaje: "Tarea insertada: "+tareaInsertada});
        }
    });
}

module.exports.modificarTarea = (req,res) => {
    var id = req.params.idTarea;
    var actualizacion = req.body;
    console.log("entro")
    console.log(req.body)
    Tarea.findByIdAndUpdate(id,actualizacion,(err,tarea)=>{
        if(err){
            console.log("error, "+err)
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(500).send({mensaje: "Error: "+err});
        }else if(!tarea){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(404).send({mensaje: "No se encontró la tarea: "+err});
        }else{
            console.log("Actualiza")
            console.log(req.body)
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send({mensaje: "Tarea actualizada: "+tarea});
        }
    })
}

module.exports.eliminarTarea = (req,res)=>{

    var id = req.params.idTarea;
    Tarea.findById(id,(err,tarea)=>{
        if(err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Method", "DELETE");
            res.status(500).send({mensaje: "Error: "+err});
        }else if(!tarea){
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Method", "DELETE");
            res.status(404).send({mensaje: "No se encontró la tarea"});
        }else{
            tarea.remove((err)=>{
                if(err){
                  res.header("Access-Control-Allow-Origin", "*");
                  res.header("Access-Control-Allow-Method", "DELETE");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.status(500).send({message:"Error al borrar la tarea"});
                }else{
                  res.header("Access-Control-Allow-Origin", "*");
                  res.header("Access-Control-Allow-Method", "DELETE")
                    res.status(200).send({message:"tarea eliminada"});
                }
            });
        }
    });
}

module.exports.finalizarTarea = (req,res)=>{
    var id = req.params.idTarea;
    Tarea.findByIdAndUpdate(id,{entregado:true},(err,tarea)=>{
        if(err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(500).send({mensaje: "Error: "+err});
        }else if(!tarea){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(404).send({mensaje: "No se encontró la tarea: "+err});
        }else{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send({mensaje: "Tarea finalizada: "+tarea});
        }
    })
}
