// import orm from '../../model/orm.js';
// import PendingMatch from '../../model/pendingMatchModel.js';
import pendingMatchController from '../pendingMatchController.js';

const pendingMatchHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('connected to match path');

        socket.on('match-easy', (data) => {
            pendingMatchController.addPendingMatchEasy(data);
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

        // socket.on('delete-match', () => {
        //     orm.deleteMatchByDifficulty('easy');
        // });
        socket.on('delete', () => {});
    });
};

export default pendingMatchHandler;
