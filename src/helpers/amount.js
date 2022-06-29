
const getAmount = (movim) => {
    
    let floatAmount = movim.total2 //? parsear luego a float
    const fechaHoy = getZeroTimeDate(new Date());
    try {
        //ver el campo fvto1 y fvto2 . Si la fecha actual es menor o igual a fvto1 tomar 1 sino tomar 2
        if (fechaHoy <= movim.fvto1) {
            floatAmount = movim.total1;
        }
        else{
            floatAmount = movim.total2;
        }
    } catch (error) {
        //Si fallo por algun motivo, por ejemplo que venian nulas las fechas de vencimiento toma el total 2 por default
        floatAmount = movim.total2;
    }
    return floatAmount

}
const getZeroTimeDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
const parseAmountToLong = (floatAmount) => {
    //? decimal format to "0.00"
    const longAmount = parseFloat(floatAmount).toFixed(2).replace('.', '');
    return longAmount;
}

module.exports = { getAmount, parseAmountToLong };