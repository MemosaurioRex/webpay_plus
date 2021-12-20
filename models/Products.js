const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: String,
        price: Number,
        filename: String,
        path: String,
        originalname: String,
        mimetype: String,
        size: Number,
        tiempo: Number
    },{timestamps: true});
    ProductSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Products', ProductSchema);