const { getBoletaById } = require('../services/boleta');	

const getBoleta = (req, res) => {
    let { nroTran } = req.query;
    try { //? si con modelos podemos evistar mandar el sql qery
        //? resolve nro transac float
        const movim = getBoletaById(nroTran);
        if (!movim) {
            return res.status(404).json({
                message: 'No existe la boleta correspondiente al número de transacción ingresado.'
            });
        }
        res.status(200).json({
            message: 'Boleta obtenida',
            data: movim
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Ocurrió un error obteniendo movimiento: ${error}`,
        });
    }
}

module.exports = {
    getBoleta
}