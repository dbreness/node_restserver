const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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
        console.log(body.password)
        console.log(userDB.password)
        console.log(ValidPassword)

        // if(!ValidPassword){
        //     return res.status(400).json({
        //         ok:false,
        //         message: 'Password incorrecto'
        //     });
        // }

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


//=================================
//   Configuraciones para Google
//=================================
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return{

        nombre: payload.name,
        email:  payload.email,
        img:    payload.picture,
        google :true
    }
    
  }

app.post('/google', async (req, res) =>{

    let token = req.body.idtoken;
    let googleUser = await verify(token)
        .catch( err => {
            return res.status(403).json({
                ok: false,
                error: err
            });
        });
        

        Usuario.findOne({email: googleUser.email}, (err, userDB) =>{

            if(err){
                return res.status(500).json({
                     ok:false,
                     err
                 });
            }

            if (userDB) {
                if (userDB.google === false) {
                    return res.status(400).json({
                        ok: false,
                        err:{
                            message: 'Debe de usar su Autenticacion normal'
                        }
                    });
                } else {

                    let token = jwt.sign({
                        user : userDB
                    }, process.env.SEED, { expiresIn : process.env.EXP_TOKEN});
            
                    return res.json({
                        ok: true,
                        user: userDB,
                        token,
                    });
                } 
            } else{
                //Si no existe en BD se crea uno nuevo
                let usuario = new Usuario({
                    nombre: googleUser.nombre,
                    email: googleUser.email,
                    img: googleUser.img,
                    google: true,
                    password: bcrypt.hashSync(":)", 13)
                });

                usuario.save( (err, usuarioDB) => {

                    if(err){
                       return res.status(400).json({
                            ok:false,
                            err
                        });
                    }

                    let token = jwt.sign({
                        user : usuarioDB
                    }, process.env.SEED, { expiresIn : process.env.EXP_TOKEN});
            
                    res.json({
                        ok: true,
                        user: usuarioDB,
                        token
                    });
            
                });

                

            }



        });


})





module.exports = app;