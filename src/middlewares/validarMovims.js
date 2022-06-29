// const { nroTran, appOrigen } = req.query || req.body;
const { getByNroTran } = require('../services/movimiento');

const validarMovims = async(req, res, next) => {
    const { nroTran } = req.query;
    try {
        const movim = await getByNroTran(nroTran);
        if (!movim || movim == undefined) {
            return res.status(404).json({
                message: 'No existe la boleta correspondiente al número de transacción ingresado.' 
            });
        }
        req.movim = movim;
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