const jwt = require('jsonwebtoken');


//=================================
//   Verificar token
//=================================
let verifyToken = (req, res, next) =>{

    let token = req.get('Authorization');


    jwt.verify(token, process.env.SEED, (err, decoded)=>{
        
        if(err){
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.user = decoded.user;
        next();

    });

}

//=================================
//   Verificar token
//=================================
let verifyRole = (req, res, next) =>{

    let user = req.user;
    
    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            err:{
                message:'El usuario no es administrador'
            }
        });
    }
}


module.exports = {
    verifyToken,
    verifyRole
}


