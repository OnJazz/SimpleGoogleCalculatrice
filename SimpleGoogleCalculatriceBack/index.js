const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


//routes
const calculatriceRoutes = require('./calculatrice/calculatrice.router.ts');

const app = express();
const port = 3000;

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(express.json());

// REQUETES POUR CALCULER
app.use('/calcul', calculatriceRoutes);

app.get('/', (req, res) => {
    console.log("connard")
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});