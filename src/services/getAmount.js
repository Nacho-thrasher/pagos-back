
const getAmount = (movim) => {
    if (movim = null) {
        return null;
    }
    let fechaHoy = getZeroTimeDate(new Date());
    try {
        

    } catch (error) {
        console.log(error);
        return null;
    }

}
const getZeroTimeDate = (date) => {
    let d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

module.exports = {
    getAmount
}