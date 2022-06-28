const { getByNroTran } = require('../services/movimiento');
const { getCondicionAlumno } = require('../services/condicionAlumno');
const { medioPagoById } = require('../services/medioPago');
const { obtenerPago } = require('../services/decidir');
const { getCuotaByID } = require('../services/cuota');
// import ITransaction from '../db/models/ITransaction';

const getStatusPago = async(req, res) => {
    let { nroTran } = req.query;
    try { //? resolve nro transac float
        if (nroTran.length === 0) {
            return res.status(400).json({
                message: 'El parámetro nroTran no puede ser nulo o vacío.'
            });
        }
        const getPago = await obtenerPago(nroTran);
        if (!getPago || getPago.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron pagos para el número de transacción ingresado.'
            });
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
const ejecutarPago = async(req, res) => {
    //payment request dto valida el body: token, site transaction id, payment method id, bin, cuota id
    const { nroTran, appOrigen } = req.query;
    //? ges decidir log nrotran, apporigen, body
    try {
        // metodos movim, condicion alumno, medio pago, cuota, amount 
        // pasan a validaciones en middlewares 
        const movim = getByNroTran(nroTran);
        if (!movim) {
            //# editar GES DECIDIR LOG
            return res.status(404).json('No existe la boleta correspondiente al número de transacción ingresado.'); 
        }
        const condicionAlumno = await getCondicionAlumno(movim); // no va
        const medioPago = await medioPagoById(req.body.payment_method_id, condicionAlumno);
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
    getStatusPago,
    ejecutarPago
}