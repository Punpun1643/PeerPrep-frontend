import pendingMatchController from '../pendingMatchController.js';

const pendingMatchHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('connected to match path');

        socket.on('match-easy', async (data) => {
            const user = await pendingMatchController.getAvailableMatch('easy');
            // if no match --> add to db
            if (user === null) {
                pendingMatchController.addPendingMatchEasy(data);
            } else {
                // if there is a match --> match
                pendingMatchController.deleteMatchByDifficulty('easy');
            }
        });

        socket.on('match-medium', (data) => {
            pendingMatchController.addPendingMatchMedium(data);
        });

        socket.on('match-hard', (data) => {
            pendingMatchController.addPendingMatchHard(data);
        });

        socket.on('no-match-found', (data) => {
            pendingMatchController.deletePendingMatchById(data);
        });
    });
};

export default pendingMatchHandler;
