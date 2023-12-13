const datos = require('mysql');
const conectar = datos.createPool({
    host: 'localhost',
    user :'root',
    password : '',
    database : 'personas' 
});

module.exports = conectar;
