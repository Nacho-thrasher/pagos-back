const oracledb = require('oracledb');
const dbConfig = require('../db/config/config');

const getCuotaByID = async(idCuota) => {
    try {
        const connection = await oracledb.getConnection(dbConfig.development)
        connection.then(async (connection) => {
            const result = await connection.execute(
                `SELECT * FROM TBL_DEC_CUOTAS WHERE CUOTA_ID = :idCuota`,
                [idCuota],
                { outFormat: oracledb.OBJECT }
            );
            if (!result.rows[0]) {
                return null;
            }
            result.rows[0];
            
        })
        .catch(err => {
            console.log(err);
            return null;
        });

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getCuotaByID
}