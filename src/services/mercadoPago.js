const oracledb = require('oracledb');
const dbConfig = require('../db/config/config');

const getMarcaReinscripcionFicha = async (tdocu, ndocu, lugar, sector, carrera, modo) => {
    try {
        //? select con where tdocu, ndocu, lugar, sector, carrera, modo
        const connection = oracledb.getConnection(dbConfig.development)
        connection.then(async (connection) => {
            const result = await connection.execute(
                `SELECT INSC_REINS FROM GES_FICHAS WHERE TDOCU = :tdocu AND NDOCU = :ndocu AND LUGAR = :lugar AND SECTOR = :sector AND CARRERA = :carrera AND MODO = :modo`,
                [tdocu, ndocu, lugar, sector, carrera, modo],
                { outFormat: oracledb.OBJECT }
            );
            if (!result.rows[0]) {
                return null;
            }
            return result.rows[0];

        }).catch(err => {
            console.log(err);
            return null;
        })

    } catch (error) {
        console.log(error);
        return null;
    }
}

const devolverMaestro = async (tdocu, ndocu, lugar, sector, carrera, modo) => {
    try {
        const connection = oracledb.getConnection(dbConfig.development)
        connection.then(async (connection) => {
            const result = await connection.execute(
                `SELECT T FROM GesMaestros t WHERE t.tdocu = :tdocu AND t.ndocu = :ndocu AND t.lugar = :lugar AND t.sector = :sector AND t.carrera = :carrera AND t.modo = :modo`,
                [tdocu, ndocu, lugar, sector, carrera, modo],
                { outFormat: oracledb.OBJECT }
            );
            if (!result.rows[0]) {
                return null;
            }
            return result.rows[0];

        }).catch(err => {
            console.log(err);
            return null;
        })

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getMarcaReinscripcionFicha,
    devolverMaestro
}