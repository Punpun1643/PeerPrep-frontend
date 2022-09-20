import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import db from './repository.js';
import routes from './routes.js';
import pendingMatchHandler from './controller/socketHandler/pendingMatchHandler.js';
import globalHandler from './controller/socketHandler/globalHandler.js';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 8001;

// io
const io = new Server(httpServer, {
    cors: {
        cors: {
            origin: 'http://localhost:3000',
        },
    },
});
const addUserIo = io.of('/pendingMatches');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.use('/', routes);
app.options('*', cors());
app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});

// database connection
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch((err) => {
    console.log(err);
});
// update database with changes related to database structure
db.sync().then(() => {}).catch((err) => console.log(`Error:${err}`));

// log to console when there is a connection from the client
globalHandler(io);
// handle pending match events
pendingMatchHandler(addUserIo);

httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
