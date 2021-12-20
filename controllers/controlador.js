'use strict'

const BDProducts = require("../models/BDProducts")

// function obtenerResultados(req, res) {
//     // let idPedido = 8145663939439689;
//     let resultado = BDProducts.find({})
//         res.status(200).render('webpay_plus/vista', {resultado});
// }
// function obtenerVista(req, res) {
//     let idPedido = req.params.idPedido
//     BDProducts.find(idPedido, (err, cosa) => {
//         res.status(200).send({cosa})
//     })
// }
function obtenerResultados (req, res) {
    BDProducts.find({}, (err, resultado) => {
        res.render('webpay_plus/vista', {resultado});
    })
}

module.exports = {
    obtenerResultados
}