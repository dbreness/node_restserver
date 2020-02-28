

const express = require('express');
const app = express();
const Usuario = require('../models/usuario')

const bcrypt = require('bcrypt');
const _ = require('underscore');


app.get('/usuario', function (req, res) {

    Usuario.find({estado : true})
    .exec((err, usuarios)=>{

        if(err){
            return res.status(400).json({
                 ok:false,
                 err
             });
        }
    
        res.json({usuarios});

    });

  });

app.post('/usuario', function (req, res) {
    
    let body = req.body;

    let usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password: bcrypt.hashSync(body.password, 15),
        role:body.role
    });

    usuario.save( (err, usuarioDB) => {

        if(err){
           return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            usuario:usuarioDB
        });

    });

   
});

app.put('/usuario/:userId', function (req, res) {

    let id = req.params.id;

    // _ permite por medio de la funcion pick seleccionar los elementos del objeto q se desean modificar
    let body =  _.pick(req.body, ['nombre','email','img','role','estado'] ); 


    Usuario.findOneAndUpdate(id, body, {new : true, runValidators : true}, (err, usuarioDB) => {
        
        if(err){
           return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({usuarioDB});

    });

});

app.delete('/usuario/:id', function (req, res) {
    
    let id = req.params.id;
    let body =  {
        estado : false
    };

    Usuario.findOneAndUpdate(id, body, {new : true}, (err, usuarioEliminado) => {

        if(err){
            return res.status(400).json({
                 ok:false,
                 err
             });
         }
         
         res.json({usuarioEliminado})

    });

});


module.exports = app;