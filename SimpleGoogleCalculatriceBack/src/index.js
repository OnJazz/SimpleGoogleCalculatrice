"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//routes
const calculatrice_router_1 = require("./calculatrice/calculatrice.router");
const app = (0, express_1.default)();
const port = 3000;
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// REQUETES POUR CALCULER
app.use('/calcul', calculatrice_router_1.router);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
