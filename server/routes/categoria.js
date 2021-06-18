const express = require('express');
const app = express();

const Categoria = require('../models/categoria');
const { verifyToken, verifyRole } = require('../middlewares/autentication');



/**
 * 
 * Mostrar todas las categorias.
 * 
 */
 app.get('/categoria', verifyToken, (req, res)=>{

    Categoria.find().exec((err, categorias)=>{

        if(err){
            return res.status(500).json({
                 ok:false,
                 err
             });
        }

        res.json({categorias});

    });

 });

 /**
 * 
 * Mostrar una categoria por ID.
 * 
 */
app.get('/categoria/:id', verifyToken, (req, res)=>{

});


 /**
 * 
 * Crear una nueva categoria.
 * 
 */
app.post('/categoria', verifyToken, (req, res)=>{


    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.user._id
    });

    categoria.save((err,categoriaBD)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoriaBD){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            categoria:categoriaBD
        });
    });

});


module.exports = app;