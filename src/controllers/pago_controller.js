const { get_by_nroTran } = require('../services/get_by_nroTran');
const { get_condicion_alumno } = require('../services/get_condicion_alumno');
const { getById } = require('../services/medio_pago');
const { obtenerPago } = require('../services/decidirService');
const { getCuotaByID } = require('../services/cuota_service');

const get_status_pago = async(req, res) => {
    let { nroTran } = req.query;
    try { //? resolve nro transac float
        if (nroTran.length === 0) {
            return res.status(400).json({
                message: 'El número de transacción es requerido.'
            });
        }
        // const connection = oracledb.getConnection(dbConfig.development)
        // connection.then(async (connection) => {
        //     const movim = await connection.execute(
        //         `SELECT * FROM GES_MOVIMS_COD_BARRA2 WHERE NRO_TRANSAC = :nroTran`,
        //         [nroTran],
        //         { outFormat: oracledb.OBJECT }
        //     );
        //     if (!movim.rows[0]) {
        //         return res.status(404).json('No existe la boleta correspondiente al número de transacción ingresado.'); 
        //     }
        //     res.status(200).json({
        //         message: 'Boleta obtenida',
        //         data: movim.rows[0]
        //     });
        //     connection.close();
        // }).catch(err => {
        //     res.status(500).json({
        //         message: 'Ocurrió un error obteniendo pago',
        //         error: err
        //     });
        // });
        ///?
        const getPago = await obtenerPago(nroTran);
        if (!getPago || getPago.length === 0) {
            return res.status(404).json('No se encontraron pagos para el número de transacción ingresado.');
        }
        res.status(200).json({
            message: 'Pagos obtenidos',
            data: getPago
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Ocurrió un error obteniendo pago: ${error}`,
        });
    }
}
const ejecutar_pago = async(req, res) => {
    //payment request dto valida el body: token, site transaction id, payment method id, bin, cuota id
    const { nroTran, appOrigen } = req.query;
    //? ges decidir log nrotran, apporigen, body
    try {
        const movim = get_by_nroTran(nroTran);
        if (!movim) {
            //# editar GES DECIDIR LOG
            return res.status(404).json('No existe la boleta correspondiente al número de transacción ingresado.'); 
        }
        const condicionAlumno = await get_condicion_alumno(movim);
        const medioPago = await getById(req.body.payment_method_id, condicionAlumno);
        if (!medioPago) {
            //? editar GES DECIDIR LOG
            return res.status(404).json('El Medio de Pago ingresado no esta soportado.');
        }
        //? cuota id es installments
        const cuota = getCuotaByID(req.body.installments, condicionAlumno);
        if (!cuota) {
            //? editar GES DECIDIR LOG
            return res.status(404).json('No existe la cuota correspondiente al ID ingresado.');
        }
        // const floatAmount = 
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Ocurrió un error ejecutando pago: ${error}`,
        });
    }
}

module.exports = {
    get_status_pago,
    ejecutar_pago
}