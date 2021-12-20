const mongoose = require('mongoose')
const { mongodb } = require('./keys')
mongoose.connect(mongodb.URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(db => console.log('Base de datos online'))
    .catch(err => console.log(err))