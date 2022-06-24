const oracledb = require('oracledb');
const dbConfig = require('../db/config/config');

const get_boleta = (req, res) => {
    let { nroTran } = req.query;
    try {
        //? si con modelos podemos evistar mandar el sql qery
        //? resolve nro transac float
        const connection = oracledb.getConnection(dbConfig.development)
        connection.then(async (connection) => {
            const movim = await connection.execute(
                `SELECT * FROM GES_MOVIMS_COD_BARRA2 WHERE NRO_TRANSAC = :nroTran`,
                [nroTran],
                { outFormat: oracledb.OBJECT }
            );
            if (!movim.rows[0]) {
                return res.status(404).json('No existe la boleta correspondiente al número de transacción ingresado.'); 
            }
            res.status(200).json({
                message: 'Boleta obtenida',
                data: movim.rows[0]
            });
            connection.close();
        }).catch(err => {
            res.status(500).json({
                message: 'Error al obtener la boleta',
                error: err
            });
        });
        //? buscar metodos de oracledb 
        //? conexion execute query
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Ocurrió un error obteniendo movimiento: ${error}`,
        });
    }
}

module.exports = {
    get_boleta
}