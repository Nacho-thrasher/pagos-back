const { getCuotaByID } = require('../services/cuota');

const validarCuotas = async(req, res, next) => {
    const { installments } = req.body;
    try {
        const cuota = await getCuotaByID(installments);
        if (!cuota || cuota == undefined) {
            return res.status(404).json({
                message: 'No existe la cuota correspondiente al ID ingresado.' 
            });
        }
        req.cuota = cuota;
        next();       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Ocurrió un error obteniendo cuota: ${error}`,
        });   
    }
}

module.exports = { validarCuotas };