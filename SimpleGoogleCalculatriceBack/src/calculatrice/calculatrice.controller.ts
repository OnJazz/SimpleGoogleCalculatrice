export class CalculController {

    constructor() { }

    calcul = (req: { body: { calcul: any; }; }, res: { json: (arg0: any) => any; }, next: any) => {
        console.log("je reçois du front");
        let calculAsString = req.body.calcul;
        return res.json(calculAsString);
    }
}
