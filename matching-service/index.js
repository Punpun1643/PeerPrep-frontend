import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import db from './repository.js';
import routes from './routes.js';

// database connection
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

app.use('/', routes);

const httpServer = createServer(app);
const PORT = process.env.PORT || 8001;

// update database with changes related to database structure
db.sync().then(() => {
    httpServer.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch((err) => console.log(`Error:${err}`));
