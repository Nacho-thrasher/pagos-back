const oracledb = require('oracledb');
const dbConfig = require('../db/config/config');

const medioPagoById = async (medioPagoId) => {
    //? consultar id medio pago en tabla medio_pago
    try {
        const connection = await oracledb.getConnection(dbConfig.development)
        connection.then(async (connection) => {
            const result = await connection.execute(
                `SELECT * FROM TBL_DEC_MEDIO_PAGOS WHERE MEDIO_PAGO_ID = :medioPagoId`,
                [medioPagoId],
                { outFormat: oracledb.OBJECT }
            );
            if (!result.rows[0]) {
                return null;
            }
            const medioPago = result.rows[0];
            return medioPago;
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
    medioPagoById
}