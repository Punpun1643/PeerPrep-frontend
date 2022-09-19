import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import db from './repository.js';
import routes from './routes.js';
import pendingMatchController from './controller/controller.js';

// database connection
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch((err) => {
    console.log(err);
});

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const addUserIo = io.of('/pendingMatches');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});
app.use('/', routes);

const PORT = process.env.PORT || 8001;

// update database with changes related to database structure
db.sync().then(() => {}).catch((err) => console.log(`Error:${err}`));

// log to console when there is a connection from the client
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

addUserIo.on('connection', (socket) => {
    console.log('yayyy connected to the correct path, goood to go!!!');

    // socket.on('match', () => {
    //     console.log('yayyyy i can finally listen to match event good job!');
    // });
    socket.on('match', (data) => {
        const newPendingMatch = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: data,
        };
        pendingMatchController.addPendingMatch(newPendingMatch);
        console.log(newPendingMatch);
        console.log('added user');
    });
});

httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
