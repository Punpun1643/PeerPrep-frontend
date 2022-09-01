import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import db from './repository.js';

db.authenticate().then(() => {
    console.log('Database connected...');
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});

const httpServer = createServer(app);
db.sync().then(() => {
    httpServer.listen(8001);
}).catch((err) => console.log(`Error:${err}`));
