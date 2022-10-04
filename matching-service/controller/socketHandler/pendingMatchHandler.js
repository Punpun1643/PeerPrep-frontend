import pendingMatchController from '../pendingMatchController.js';

const pendingMatchHandler = (io) => {
    io.on('connection', (socket) => {
        console.log(`socket id is ${socket.id}`);
        console.log(socket.rooms);

        socket.on('match-easy', async (data) => {
            const user = await pendingMatchController.getAvailableMatch('easy');

            // if no match --> add to db
            if (user === null) {
                pendingMatchController.addPendingMatchEasy(socket.id, data);
            } else {
                const currentSocketId = user.dataValues.socketid;

                // emit succcess event to the matched users
                io.to(socket.id).emit('match-success', currentSocketId, socket.id);
                io.to(currentSocketId).emit('match-success', currentSocketId, socket.id);

                // else --> match and delete
                pendingMatchController.deleteMatchByDifficulty('easy');
            }
        });

        // join room based on socketid
        socket.on('join-room', async (socketid) => {
            socket.join(socketid);
            console.log('joined');

            // Date: 4/10/2022 - This is just for demonstration later
            // const roomUsers = await io.in(socketid).fetchSockets();

            // console.log(roomUsers);

            // // for (const roomUser in roomUsers) {
            // //     console.log(roomUser);
            // // }
        });

        socket.on('match-medium', async (data) => {
            const user = await pendingMatchController.getAvailableMatch('medium');
            if (user === null) {
                pendingMatchController.addPendingMatchMedium(socket.id, data);
            } else {
                const currentSocketId = user.dataValues.socketid;

                io.to(socket.id).emit('match-success', currentSocketId, socket.id);
                io.to(currentSocketId).emit('match-success', currentSocketId, socket.id);

                pendingMatchController.deleteMatchByDifficulty('medium');
            }
        });

        socket.on('match-hard', async (data) => {
            socket.join('hard-waiting-room');
            const user = await pendingMatchController.getAvailableMatch('hard');
            if (user === null) {
                pendingMatchController.addPendingMatchHard(socket.id, data);
            } else {
                const currentSocketId = user.dataValues.socketid;

                io.to(socket.id).emit('match-success', currentSocketId, socket.id);
                io.to(currentSocketId).emit('match-success', currentSocketId, socket.id);

                pendingMatchController.deleteMatchByDifficulty('hard');
            }
        });

        // no match found after 30s end
        socket.on('no-match-found', (id) => {
            pendingMatchController.deleteMatchByDifficulty(id);
        });

        // pending match is cancelled before 30s ends
        // alternative idea: a particular-room receive cancel-match event
        // then destroy all pending match in that room
        // socket.on('match-cancel', (id) => {
        //     pendingMatchController.deletePendingMatchById(id);
        // });
        socket.on('match-cancel', (username) => {
            pendingMatchController.deletePendingMatchByUsername(username);
        });

        // leaves room after matched
        // takes room id
        // emit event to that room and destroy all matches in that room
        socket.on('leave-room', () => {});
    });
};

export default pendingMatchHandler;
