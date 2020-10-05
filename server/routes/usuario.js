

const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const { verifyToken, verifyRole } = require('../middlewares/autentication');

const bcrypt = require('bcrypt');
const _ = require('underscore');


app.get('/usuario', verifyToken, (req, res) => {
    
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

app.post('/usuario', [verifyToken, verifyRole], (req, res) =>{
    
    let body = req.body;

    let usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password: bcrypt.hashSync(body.password, 13),
        role:body.role
    });

    //Calback para guardar el nuevo usuario en BD
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

app.put('/usuario/:userId', [verifyToken, verifyRole], function (req, res) {

    let id = req.params.userId;
    // _ permite por medio de la funcion pick seleccionar los elementos del objeto que se desean modificar
    let user =  _.pick(req.body, ['nombre','email','img','role','estado'] ); 

    Usuario.findOneAndUpdate(id, user, {new:true, runValidators:true}, (err, usuarioDB) => {
        
        if(err){
           return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({usuarioDB});

    });

});

app.delete('/usuario/:id', [verifyToken, verifyRole], function (req, res) {
    
    let id = req.params.id;
    let user =  {
        estado : false
    };

    Usuario.findOneAndUpdate(id, user, {new : true}, (err, usuarioEliminado) => {

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