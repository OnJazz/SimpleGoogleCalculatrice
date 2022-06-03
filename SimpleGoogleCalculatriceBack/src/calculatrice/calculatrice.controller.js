"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculController = void 0;
class CalculController {
    constructor() {
        this.calcul = (req, res, next) => {
            let calculAsString = req.body.calcul;
            return res.json("" + this.calcFromString(calculAsString));
        };
        this.calcFromString = (mystring) => {
            if (mystring.includes("+")) {
                let r = 0;
                mystring.split("+").map(elt => r += this.calcFromString(elt));
                return r;
            }
            else if (mystring.includes("-") && !mystring.includes("x-") && !mystring.includes("÷-")) {
                let r = this.calcFromString(mystring.split("-")[0]);
                for (let i = 1; i < mystring.split("-").length; i++) {
                    r -= this.calcFromString(mystring.split("-")[i]);
                }
                return r;
            }
            else if (mystring.includes("x")) {
                let r = 1;
                mystring.split("x").map(elt => r *= this.calcFromString(elt));
                return r;
            }
            else if (mystring.includes("÷")) {
                let r = this.calcFromString(mystring.split("÷")[0]);
                for (let i = 1; i < mystring.split("÷").length; i++) {
                    r /= this.calcFromString(mystring.split("÷")[i]);
                }
                return r;
            }
            else {
                try {
                    if (mystring == "")
                        return 0;
                    if (mystring.includes(".")) {
                        return +parseFloat(mystring).toFixed(mystring.split(".")[1].length);
                    }
                    else {
                        return parseInt(mystring);
                    }
                }
                catch (error) {
                    return 0;
                }
            }
        };
    }
}
exports.CalculController = CalculController;
