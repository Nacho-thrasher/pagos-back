const oracledb = require('oracledb');
const dbConfig = require('../db/config/config');
const get_condicion_alumno = async(nroTran) => {
    try {
        const connection = await oracledb.getConnection(dbConfig.development)
        
        
    } catch (error) {
        console.log(error);
        return null;
    }
}
module.exports = {
    get_condicion_alumno
}
