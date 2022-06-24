//? require a node oracle db 
const oracledb = require('oracledb');

const connection = async () => {
    try {
        await oracledb.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECT_STRING
        });
        console.log('Connected to db');
        //? conexion execute query
    } catch (error) {
        console.log('No se pudo conectar a db',error)
    }
}
module.exports = {
    connection
}
