// return result from the calcul
exports.calcul = (req, res, next) => {
    console.log("je reçois du front");
    let calculAsString = req.body.calcul;
    return res.json(calculAsString);
}