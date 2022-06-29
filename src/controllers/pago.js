const { getPagoDecidir, postPagoDecidir } = require('../services/decidir');
const { getAmount, parseAmountToLong } = require('../helpers/amount');
const { calcularMontoConInteres, calcularMontoPorCuota } = require('../helpers/cuota');
// import ITransaction from '../db/models/ITransaction';

const getStatusPago = async(req, res) => {
    let { nroTran } = req.query;
    try { //? resolve nro transac float
        const getPago = await getPagoDecidir(nroTran);
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
        console.log('aqui',error);
        res.status(500).json({
            message: `Ocurrió un error obteniendo pago: ${error}`,
        });
    }
}
const ejecutarPago = async(req, res) => {
    //payment request dto valida el body: token, site transaction id, payment method id, bin, cuota id
    const { nroTran, appOrigen } = req.query;
    const { movim, cuota, medioPago } = req;
    try { //? ges decidir log es add, va agregando los movimientos
        const floatAmount = getAmount(movim);
        if (floatAmount == null) {
            return res.status(404).json({
                message: 'No es posible ejecutar el pago debido a que no se pudo obtener el monto asociado a la transacción.'
            });
        }
        const longAmount = parseAmountToLong(floatAmount);
        const montoConInteres = calcularMontoConInteres(floatAmount, cuota.interes);
        const montoPorCuota = calcularMontoPorCuota(floatAmount, cuota.cantidad, cuota.interes); 
        //? Actualizo el intento de pago con decidir en la tabla GES_DECIDIR_LOG
        // const updateDecidirLog = await updateDecidirLog(nroTran, appOrigen, longAmount);
        const paymentResponse = await postPagoDecidir(req.body ,movim, longAmount, cuota.cantidad, medioPago.site_id);       
        if (!paymentResponse || paymentResponse.length === 0) {
            return res.status(404).json({
                message: 'Falló el proceso ejecutarPago (Decidir).'
            });
        }
        const statusPayment = paymentResponse.status;
        if (statusPayment === "approved") {
            //? agrego en ges decidir log el pago  

        }
        //? caso rejected
        

    } 
    catch (error) {
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