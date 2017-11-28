var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var TareaSchema = new Schema({
    titulo: String,
    descripcion: String,
    fechaEntrega: Date,
    entregado: {type : Boolean, default : false},
    autor: { type: Schema.ObjectId, ref: "usuario" }

});


module.exports = mongoose.model('Tarea',TareaSchema,'tarea');