require('./config/config');

const express = require('express');
const app = express();

const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//se importa y utiliza las rutas
app.use(require('./routes/index'));


mongoose.connect(process.env.URLBD, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex : true }, (error, res) => {
    if(error) throw error;

    console.log("DB online");
});

  app.listen(process.env.PORT, () => {
      console.log("escuchando puerto: ", 3000);
  });