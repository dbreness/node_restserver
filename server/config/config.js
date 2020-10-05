//=================================
//   Puerto
//=================================
process.env.PORT = process.env.PORT || 3000;

//=================================
//   Entorno
//=================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=================================
//   Expiracion del token
//=================================
process.env.EXP_TOKEN = 60 * 60 * 24 * 15

//=================================
//   SEED de autenticacion
//=================================
process.env.SEED = process.env.SEED || 'seed-dev';

//=================================
//   Base de Datos
//=================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLBD = urlDB;