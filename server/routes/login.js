const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();



app.post('/login', (req, res) =>{

    let body = req.body;

    Usuario.findOne({email: body.email}, (err, userDB) =>{
        
        if(err){
            return res.status(500).json({
                 ok:false,
                 err
             });
        }

        if(!userDB){
            return res.status(400).json({
                ok:false,
                message: 'Usuario incorrecto'
            });
        }

        let ValidPassword = bcrypt.compareSync(body.password, userDB.password);

        if(!ValidPassword){
            return res.status(400).json({
                ok:false,
                message: 'Password incorrecto'
            });
        }

        let token = jwt.sign({
            user : userDB
        }, process.env.SEED, { expiresIn : process.env.EXP_TOKEN});

        res.json({
            ok: true,
            user: userDB,
            token
        });

    });
    
    



})





module.exports = app;