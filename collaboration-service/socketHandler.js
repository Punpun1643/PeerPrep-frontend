const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });

        socket.on('on-keypress', (text) => {
            console.log(text);
        })
    });
};

export default socketHandler;
