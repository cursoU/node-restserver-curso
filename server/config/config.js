// 
//================
//PUERTO
//================

process.env.PORT = process.env.PORT || 3000;

// 
//================
//entorno
//================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================
//vencimineto del token
//60 segundo
//60 Minutos
//24 Horas
//30 dias
//================
process.env.CADUCIDAD_TOKEN = '48h';

//================
//semilla token
//================
process.env.SEEDTOKEN = process.env.SEEDTOKEN || 'SECRET';


//================
//Base de datos
//================

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

/* urlDB = 'mongodb://testing:123456a@ds115664.mlab.com:15664/cafe';
 */
process.env.URLDB = urlDB;



/** 
 * googelc client id 
 */

process.env.CLIENT_ID = process.env.CLIENT_ID || '639603229499-etd01liu97os89ik9ul3tovb54gu594m.apps.googleusercontent.com';