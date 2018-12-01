const mongoose = require('mongoose');

/* 
const uniqueValidator = require('mongoose-unique-validator');
 */


let Schema = mongoose.Schema;



let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'El Nombre es necesario']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    }
});


/*
categoriaSchema.methods.toJSON = function() {
    let descripcion = this;

    let categoriaObject = descripcion.toObject();
    return categoriaObject;
}
categoriaSchema.plugin(uniqueValidator, { message: '{PATH} Debe Ser único' });
*/

module.exports = mongoose.model('Categoria', categoriaSchema);