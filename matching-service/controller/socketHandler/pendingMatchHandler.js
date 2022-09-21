import pendingMatchController from '../pendingMatchController.js';

const pendingMatchHandler = (io) => {
    io.on('connection', (socket) => {
        socket.on('match-easy', async (data) => {
            // note: maybe need to join from client side?
            socket.join('easy-waiting-room');
            const user = await pendingMatchController.getAvailableMatch('easy');
            // if no match --> add to db
            if (user === null) {
                pendingMatchController.addPendingMatchEasy(data, socket.id);
            } else {
                io.to('easy-waiting-room').emit('match-success', socket.id);
                // else --> match and delete
                pendingMatchController.deleteMatchByDifficulty('easy');
            }
        });

        socket.on('match-medium', async (data) => {
            socket.join('medium-waiting-room');
            const user = await pendingMatchController.getAvailableMatch('medium');
            if (user === null) {
                pendingMatchController.addPendingMatchMedium(data, socket.id);
            } else {
                io.to('medium-waiting-room').emit('match-success', socket.id);
                pendingMatchController.deleteMatchByDifficulty('medium');
            }
        });

        socket.on('match-hard', async (data) => {
            socket.join('hard-waiting-room');
            const user = await pendingMatchController.getAvailableMatch('hard');
            if (user === null) {
                pendingMatchController.addPendingMatchHard(data, socket.id);
            } else {
                pendingMatchController.deleteMatchByDifficulty('hard');
                io.to('hard-waiting-room').emit('match-success-hard', socket.id);
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
