import pendingMatchController from '../pendingMatchController.js';

const pendingMatchHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('connected to match path');

        socket.on('match-easy', async (data) => {
            socket.join('easy-waiting-room');
            const user = await pendingMatchController.getAvailableMatch('easy');
            // if no match --> add to db
            if (user === null) {
                pendingMatchController.addPendingMatchEasy(data, socket.id);
            } else {
                io.to('easy-waiting-room').emit('match-success', socket.id);
                // if there is a match --> match
                pendingMatchController.deleteMatchByDifficulty('easy');
                // emit event to a particular socket id
                // should io emit or socket emit?
                // socket.emit('match-success', socket.id);
                // io.to('easy-waiting-room').emit('match-success', socket.id);
            }
        });

        socket.on('match-success', () => {
            console.log('i have been matched!');
        });

        socket.on('match-medium', async (data) => {
            const user = await pendingMatchController.getAvailableMatch('medium');
            if (user === null) {
                pendingMatchController.addPendingMatchMedium(data, socket.id);
            } else {
                pendingMatchController.deleteMatchByDifficulty('medium');
                io.emit('match-success', socket.id);
            }
        });

        socket.on('match-hard', async (data) => {
            const user = await pendingMatchController.getAvailableMatch('hard');
            if (user === null) {
                pendingMatchController.addPendingMatchHard(data, socket.id);
            } else {
                pendingMatchController.deleteMatchByDifficulty('hard');
                // io.emit('match-success', socket.id);
                socket.emit('match-success', socket.id);
            }
        });

        socket.on('no-match-found', (data) => {
            // pendingMatchController.deletePendingMatchById(data);
            // send to a particular socket only
        });

        // socket.on('cancel-match', )
    });
};

export default pendingMatchHandler;
