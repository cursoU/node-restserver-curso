const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');



let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}


let usuaurioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El Correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesario']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        required: [false, 'El Rol es necesario'],
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuaurioSchema.methods.toJSON = function() {
    let user = this;

    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}
usuaurioSchema.plugin(uniqueValidator, { message: '{PATH} Debe Ser único' });

module.exports = mongoose.model('Usuario', usuaurioSchema);