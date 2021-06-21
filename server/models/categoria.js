const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: { type: String, unique: true, required: [true, 'La descripción es obligatoria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

//Eliminar el password cada que se imprima el modelo del usuario
categoriaSchema.methods.toJSON = function () {

    const {__v, _id, ...categoria} = this.toObject();
    categoria.uid = _id

    return categoria;
};

module.exports = mongoose.model('Categoria', categoriaSchema);