import express from 'express';
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

// REQUEST TO CALCUL
app.use('/calcul', router);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});