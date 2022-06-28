const oracledb = require('oracledb');
const dbConfig = require('../db/config/config');
const { getMarcaReinscripcionFicha, devolverMaestro } = require('./mercadoPago');

const getCondicionAlumno = async(movim) => {
    try {
        if (!movim) return null;
        let modalidad = null
        const marcaReinscripcionFicha = await getMarcaReinscripcionFicha(movim.tdocu, movim.ndocu, movim.lugar, movim.sector, movim.carrera, movim.modo);
        if (marcaReinscripcionFicha) {
            modalidad = marcaReinscripcionFicha
        }
        else{
            const maestro = await devolverMaestro(movim.tdocu, movim.ndocu, movim.lugar, movim.sector, movim.carrera, movim.modo);
            if (maestro != null) {
                if (maestro.marcaIns != null) {
                    modalidad = maestro.marcaIns
                }
            }
        }
        return modalidad;

    } catch (error) {
        console.log(error);
        return null;
    }
}
module.exports = {
    getCondicionAlumno
}
