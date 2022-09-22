import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import db from './repository.js';
import routes from './routes.js';

// database connection
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch((err) => {
    console.log(err);
});

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: true });

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

    socket.on('match-easy', () => {
        console.log('Easy match request received');
    });

    socket.on('match-medium', () => {
        console.log('Medium match request received');
    });

    socket.on('match-hard', () => {
        console.log('Hard match request received');
    });

    socket.on('match-cancel', () => {
        console.log('Cancel match request received');
    });

    socket.on('no-match-found', () => {
        console.log('No match found');
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
