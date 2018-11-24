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
//Base de datos
//================

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://testing:123456a@ds115664.mlab.com:15664/cafe';
}

/* urlDB = 'mongodb://testing:123456a@ds115664.mlab.com:15664/cafe';
 */
process.env.URLDB = urlDB;