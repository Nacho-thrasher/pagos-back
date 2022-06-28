const oracledb = require('oracledb');
const dbConfig = require('../db/config/config');

const getBoletaById = async (nroTran) => {
    try {
        const connection = oracledb.getConnection(dbConfig.development)
        connection.then(async (connection) => {
            const movim = await connection.execute(
                `SELECT * FROM GES_MOVIMS_COD_BARRA2 WHERE NRO_TRANSAC = :nroTran`,
                [nroTran],
                { outFormat: oracledb.OBJECT }
            );
            if (!movim.rows[0]) {
                return null; 
            }
            connection.close();
            return movim.rows[0];
        }).catch(err => {
            console.log(err);
            return null;
        });

    } catch (error) {
        console.log(error);
        return null
    }
}

module.exports = {
    getBoletaById
}