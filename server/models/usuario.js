const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');
// const { delete } = require('../routes/usuario');

let rolesValidos = {
    values : ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'El email es requerido']
    },
    password:{
        type: String,
        required: [true, 'El password es requerido']
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    }
});

//Eliminar el password cada que se imprima el modelo del usuario
usuarioSchema.methods.toJSON = function () {

    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id

    return usuario;
};



usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});

module.exports = mongoose.model('usuario', usuarioSchema);