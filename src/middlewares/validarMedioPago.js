const { medioPagoById } = require('../services/medioPago');

const validarMedioPago = async(req, res, next) => {
    const { payment_method_id } = req.body;
    try {
        const medioPago = await medioPagoById(payment_method_id);
        if (!medioPago || medioPago == undefined) {
            return res.status(404).json({
                message: 'No existe el medio de pago ingresado.' 
            });
        }
        req.medioPago = medioPago;
        next();       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Ocurrió un error obteniendo medio de pago: ${error}`,
        });   
    }
}
module.exports = { validarMedioPago };