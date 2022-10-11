import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socketHandler from './socketHandler.js';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 8002;

// io
const io = new Server(httpServer, {
    cors: {
        cors: {
            origin: 'http://localhost:3000',
        },
    },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
// app.use('/', routes);
app.options('*', cors());
app.get('/', (req, res) => {
    res.send('Hello World from collaboration-service');
});

//to log onto console when client is connected 
socketHandler(io);


httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
