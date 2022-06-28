// const { nroTran, appOrigen } = req.query || req.body;
const { getByNroTran } = require('../services/movimiento');
const validarMovims = (req, res, next) => {
    const { nroTran } = req.query;
    try {
        if (!nroTran) {
            return res.status(400).json({
                message: 'El parámetro nroTran no puede ser nulo o vacío.'
            });
        }
        const movim = getByNroTran(nroTran);
        if (!movim) {
            return res.status(404).json({
                message: 'No existe la boleta correspondiente al número de transacción ingresado.' 
            });
        }
        next();       

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Ocurrió un error obteniendo movimiento: ${error}`,
        });   
    }
}
module.exports = {
    validarMovims
}