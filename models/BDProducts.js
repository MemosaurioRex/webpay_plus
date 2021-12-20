const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BDProductSchema = new Schema({
    datos: [{
        type: Schema.Types.ObjectId,
        ref: 'Products',
        autopopulate: true
    }],
    idUser: {
        type: String
    },
    totalPrecio: Number,
    direccion: String,
    numTelefono: Number,
    estado: String,
    codigoPedido: Number
},{timestamps: true});
    BDProductSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('BDProducts', BDProductSchema);