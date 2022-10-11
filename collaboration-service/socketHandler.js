const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });

        socket.on('on-keypress', (text, roomId) => {
            console.log(text);
            socket.to(roomId).emit('sync-text', text);
        });

        // join collab service based on socketid
        socket.on('join-collab-service', async (roomid) => {
            socket.join(roomid);
            console.log('joined');
        });

    });
};

export default socketHandler;
