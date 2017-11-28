var Tarea = require('../modelo/Tarea');

module.exports.mostrarTareas = function(req,res){
    Tarea.find({autor:req.payload.sub},(err,tareas)=>{
        if(err){
            res.status(500).send({mensaje: "Error: "+err});
        }else if(!tareas){
            res.status(404).send({mensaje: "No se encontró la tarea: "+err});
        }else{
            res.status(200).send(tareas);
        }
    });
}

module.exports.mostrarTarea = function(req,res){
    var id = req.params.idTarea;
    Tarea.findById({autor:req.payload.sub},id,(err,tarea)=>{
        if(err){
            res.status(500).send({mensaje: "Error: "+err});
        }else if(!tarea){
            res.status(404).send({mensaje: "No se encontró la tarea: "+err});
        }else{
            res.status(200).send(tarea);
        }
    });
}

module.exports.insertarTarea = (req,res) => {
    
    var tarea = new Tarea();
    tarea.titulo = req.body.titulo;
    tarea.descripcion = req.body.descripcion;
    tarea.fechaEntrega = req.body.fechaEntrega;
    //tarea.entregado = req.body.entregado;
    tarea.autor = req.payload.sub;

    tarea.save((err,tareaInsertada)=>{
        if(err){
            res.status(500).send({mensaje: "Error: "+err});
        }else{
            res.status(500).send({mensaje: "Tarea insertada: "+tareaInsertada});
        }
    });
}

module.exports.modificarTarea = (req,res) => {
    var id = req.params.idTarea;
    var actualizacion = req.body;
    Tarea.findByIdAndUpdate(id,actualizacion,(err,tarea)=>{
        if(err){
            res.status(500).send({mensaje: "Error: "+err});
        }else if(!tarea){
            res.status(404).send({mensaje: "No se encontró la tarea: "+err});
        }else{
            res.status(200).send({mensaje: "Tarea actualizada: "+tarea});
        }
    })
}

module.exports.eliminarTarea = (req,res)=>{
    var id = req.params.idTarea;
    Tarea.findById(id,(err,tarea)=>{
        if(err){
            res.status(500).send({mensaje: "Error: "+err});
        }else if(!tarea){
            res.status(404).send({mensaje: "No se encontró la tarea"});
        }else{
            tarea.remove((err)=>{
                if(err){
                    res.status(500).send({message:"Error al borrar la tarea"});
                }else{
                    res.status(500).send({message:"tarea eliminada"});
                }
            });
        }
    });
}

module.exports.finalizarTarea = (req,res)=>{
    var id = req.params.idTarea;
    Tarea.findByIdAndUpdate(id,{entregado:true},(err,tarea)=>{
        if(err){
            res.status(500).send({mensaje: "Error: "+err});
        }else if(!tarea){
            res.status(404).send({mensaje: "No se encontró la tarea: "+err});
        }else{
            res.status(200).send({mensaje: "Tarea finalizada: "+tarea});
        }
    })
}