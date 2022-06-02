import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


//routes
import { router } from './calculatrice/calculatrice.router';

const app = express();
const port = 3000;

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(express.json());

// REQUETES POUR CALCULER
app.use('/calcul', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});